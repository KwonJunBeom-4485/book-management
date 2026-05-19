'use client';
import { useState, useEffect, use } from 'react';
// 💡 과제 조건인 notFound를 next/navigation에서 가져옵니다.
import { useRouter, notFound } from 'next/navigation';
import BookDetailSkeleton from '../../../components/BookDetailSkeleton';

interface Props {
    params: Promise<{ id: string }>;
}

interface BookDetail {
    id: number;
    title: string;
    author: string;
    price: number;
    publishedYear: number;
    isbn: string;
    available: boolean;
    createdDate?: string;
    modifiedDate?: string;
}

export default function BookDetailPage({ params }: Props) {
    const router = useRouter();
    const { id } = use(params);

    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false); // 💡 404 처리를 위한 상태
    const [isServerError, setIsServerError] = useState<Error | null>(null); // 💡 일반 에러(error.tsx) 유발용 상태

    const [form, setForm] = useState<BookDetail>({
        id: 0, title: '', author: '', price: 0, publishedYear: 0, isbn: '', available: true
    });

    useEffect(() => {
        setIsLoading(true);
        setIsNotFound(false);
        setIsServerError(null);

        fetch(`/api/books/${id}`)
            .then(res => {
                // 💡 조건 A: 잘못된 ID 접근(404) 시 -> notFound 상태 트리거
                if (res.status === 404) {
                    setIsNotFound(true);
                    return;
                }
                // 💡 조건 B: 백엔드 서버가 터졌거나 다른 심각한 에러(500 등) -> error.tsx가 잡아가도록 일반 예외 Throw
                if (!res.ok) {
                    throw new Error(`서버 에러가 발생했습니다. (Status: ${res.status})`);
                }
                return res.json();
            })
            .then(data => {
                if (data) {
                    setForm(data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.error(err);
                // 💡 런타임 에러 상태를 저장하여 error.tsx 작동 유도
                setIsServerError(err instanceof Error ? err : new Error(String(err)));
                setIsLoading(false);
            });
    }, [id]);

    // ── [ 에러 경계선 조건부 렌더링 부 ] ──

    // 1. Next.js 내장 예외 가로채기 함수 실행 (잘못된 ID)
    if (isNotFound) {
        return notFound();
    }

    // 2. 다른 예기치 못한 에러 발생 시 -> 에러를 고의로 throw하여 error.tsx가 캡처하게 만듦
    if (isServerError) {
        throw isServerError;
    }

    // 3. 로딩 상태 스케줄러
    if (isLoading) {
        return <BookDetailSkeleton />;
    }

    // 수정 요청 전송 (PUT)
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: form.title,
                author: form.author,
                price: Number(form.price),
                publishedYear: Number(form.publishedYear),
                available: form.available
            }),
        });

        if (res.ok) {
            alert('도서 정보가 성공적으로 수정되었습니다.');
            router.push('/');
            router.refresh();
        } else {
            alert('수정에 실패했습니다.');
        }
    };

    // 삭제 요청 전송 (DELETE)
    const handleDelete = async () => {
        if (!confirm('정말 이 도서를 삭제하시겠습니까?')) return;
        const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
        if (res.status === 204) {
            alert('삭제 처리 되었습니다.');
            router.push('/');
            router.refresh();
        } else {
            alert('삭제 처리에 실패했습니다.');
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '정보 없음';
        return new Date(dateStr).toLocaleString('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <button
                onClick={() => router.push('/')}
                style={{ background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer', padding: '0', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '16px' }}
            >
                ← 도서 목록으로 돌아가기
            </button>

            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                📖 도서 상세 정보 및 관리 모드
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '24px' }}>
                시스템 고유 번호(ID): {id}
            </p>

            <div style={{
                backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#4b5563', fontWeight: 'bold' }}>발급 ISBN</span>
                    <span style={{ fontFamily: 'monospace', color: '#111827', fontWeight: 'bold' }}>{form.isbn || '자동 발급 대기 중'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderTop: '1px dashed #e5e7eb', paddingTop: '8px' }}>
                    <span style={{ color: '#6b7280' }}>시스템 최초 등록일</span>
                    <span style={{ color: '#374151' }}>{formatDate(form.createdDate)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#6b7280' }}>최종 정보 수정일</span>
                    <span style={{ color: '#374151' }}>{formatDate(form.modifiedDate)}</span>
                </div>
            </div>

            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 'bold', fontSize: '0.95rem', color: '#374151' }}>
                    도서명
                    <input type="text" value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 'bold', fontSize: '0.95rem', color: '#374151' }}>
                    저자명
                    <input type="text" value={form.author || ''} onChange={e => setForm({...form, author: e.target.value})} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
                </label>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 'bold', fontSize: '0.95rem', color: '#374151' }}>
                        가격 (원)
                        <input type="number" value={form.price || 0} onChange={e => setForm({...form, price: Number(e.target.value)})} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
                    </label>

                    <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 'bold', fontSize: '0.95rem', color: '#374151' }}>
                        출판 연도 (YYYY)
                        <input type="number" value={form.publishedYear || 0} onChange={e => setForm({...form, publishedYear: Number(e.target.value)})} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }} />
                    </label>
                </div>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 'bold', fontSize: '0.95rem', color: '#374151' }}>
                    현재 대출 상태 관리
                    <select
                        value={String(form.available)}
                        onChange={e => setForm({...form, available: e.target.value === 'true'})}
                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem', backgroundColor: '#fff', cursor: 'pointer' }}
                    >
                        <option value="true">대출 가능 (Available)</option>
                        <option value="false">대출 중 (Rented)</option>
                    </select>
                </label>

                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button type="submit" style={{ flex: 2, padding: '12px', backgroundColor: '#2ea44f', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        💾 변경 사항 저장하기
                    </button>

                    <button type="button" onClick={handleDelete} style={{ flex: 1, padding: '12px', backgroundColor: '#cf222e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        🗑️ 도서 삭제
                    </button>
                </div>
            </form>
        </div>
    );
}