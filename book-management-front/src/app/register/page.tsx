'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookRegisterPage() {
    const router = useRouter();

    // 💡 신규 도서 등록용 입력 폼 상태 (ISBN은 백엔드 자동발급이므로 제외)
    const [form, setForm] = useState({
        title: '',
        author: '',
        price: '',
        publishedYear: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🚀 새 도서 등록 요청 (POST /api/books)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        // 숫자가 필요한 필드 안전하게 형변환 및 타입 매핑 보장
        const payload = {
            title: form.title,
            author: form.author,
            price: Number(form.price) || 0,
            publishedYear: Number(form.publishedYear) || 2026
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert('📚 새로운 도서가 성공적으로 등록되었습니다!');
                // 등록 후 도서 목록(메인) 페이지로 이동
                router.push('/');
                router.refresh();
            } else {
                alert('도서 등록에 실패했습니다. 입력값을 확인해 주세요.');
            }
        } catch (error) {
            console.error('등록 중 에러 발생:', error);
            alert('서버와 통신 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={() => router.push('/')}
                    style={{ padding: '6px 12px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}
                >
                    ⬅ 목록으로
                </button>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                    신규 도서 등록 시스템
                </h1>
            </div>

            <form onSubmit={handleSubmit} style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
            }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    도서명
                    <input
                        type="text"
                        value={form.title}
                        onChange={e => setForm({...form, title: e.target.value})}
                        required
                        placeholder="도서 제목을 입력하세요"
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    저자명
                    <input
                        type="text"
                        value={form.author}
                        onChange={e => setForm({...form, author: e.target.value})}
                        required
                        placeholder="저자 이름을 입력하세요"
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' }}
                    />
                </label>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        가격 (원)
                        <input
                            type="number"
                            value={form.price}
                            onChange={e => setForm({...form, price: e.target.value})}
                            required
                            placeholder="예: 15000"
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' }}
                        />
                    </label>

                    <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        출판 연도 (YYYY)
                        <input
                            type="number"
                            value={form.publishedYear}
                            onChange={e => setForm({...form, publishedYear: e.target.value})}
                            required
                            placeholder="예: 2026"
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' }}
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: '14px',
                        backgroundColor: isSubmitting ? '#9ca3af' : '#2ea44f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        fontSize: '1rem',
                        marginTop: '10px'
                    }}
                >
                    {isSubmitting ? '등록 처리 중...' : '🚀 도서 등록'}
                </button>
            </form>
        </div>
    );
}