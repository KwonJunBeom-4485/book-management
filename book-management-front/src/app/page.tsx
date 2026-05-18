'use client';
import { useState, useEffect } from 'react';
// 💡 Query Parameter 활용을 위해 useSearchParams, usePathname 추가
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    publishedYear: number;
    isbn: string;
    available: boolean;
}

export default function BookListPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // URL에서 ?search=값 가져오기 (없으면 빈 문자열)
    const searchQuery = searchParams.get('search') || '';

    const [books, setBooks] = useState<Book[]>([]);
    const [keyword, setKeyword] = useState(searchQuery); // 입력창 상태 관리

    // 💡 도서 목록 조회 및 검색 (Query Parameter 대응)
    const fetchBooks = (search: string) => {
        // search가 있으면 쿼리스트링(?title=)을 붙이고, 없으면 전체 조회
        const url = search
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/books?title=${encodeURIComponent(search)}`
            : `${process.env.NEXT_PUBLIC_API_URL}/api/books`;

        fetch(url)
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(err => console.error('도서 목록 로딩 실패:', err));
    };

    // 💡 URL의 search 파라미터가 바뀔 때마다 API를 재요청 (핵심 요구사항)
    useEffect(() => {
        setKeyword(searchQuery); // 주소창과 입력창 동기화
        fetchBooks(searchQuery);
    }, [searchQuery]);

    // 검색 실행 함수
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // 💡 검색어가 있으면 URL을 /?search=키워드 로 변경, 없으면 / 로 변경
        const params = new URLSearchParams(searchParams.toString());
        if (keyword.trim()) {
            params.set('search', keyword.trim());
        } else {
            params.delete('search');
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>

            {/* 상단 타이틀 및 등록 버튼 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📚 도서 정보 통합 관리 시스템
                </h1>
                <button
                    onClick={() => router.push('/register')}
                    style={{
                        padding: '10px 20px', backgroundColor: '#1a73e8', color: '#fff',
                        border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer'
                    }}
                >
                    도서 등록
                </button>
            </div>

            {/* 🔍 세련된 검색창 UI 컴포넌트 추가 */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="도서명 키워드를 입력하세요..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{
                        flex: 1, padding: '12px 16px', borderRadius: '6px',
                        border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '12px 24px', backgroundColor: '#4b5563', color: '#fff',
                        border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer'
                    }}
                >
                    검색
                </button>
                {searchQuery && (
                    <button
                        type="button"
                        onClick={() => router.push('/')} // 검색 초기화
                        style={{
                            padding: '12px 16px', backgroundColor: '#f3f4f6', color: '#4b5563',
                            border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
                        }}
                    >
                        초기화
                    </button>
                )}
            </form>

            {/* 도서 목록 테이블 섹션 */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '14px 20px', fontSize: '0.9rem', color: '#4b5563', fontWeight: '600', width: '60px' }}>ID</th>
                        <th style={{ padding: '14px 20px', fontSize: '0.9rem', color: '#4b5563', fontWeight: '600' }}>도서명</th>
                        <th style={{ padding: '14px 20px', fontSize: '0.9rem', color: '#4b5563', fontWeight: '600' }}>저자</th>
                        <th style={{ padding: '14px 20px', fontSize: '0.9rem', color: '#4b5563', fontWeight: '600' }}>가격</th>
                        <th style={{ padding: '14px 20px', fontSize: '0.9rem', color: '#4b5563', fontWeight: '600', width: '110px' }}>대출 상태</th>
                        <th style={{ padding: '14px 20px', fontSize: '0.9rem', color: '#4b5563', fontWeight: '600', width: '110px' }}>관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: '0.95rem' }}>
                                {searchQuery ? '🔍 검색 결과와 일치하는 도서가 없습니다.' : '현재 보관 중인 도서가 없습니다.'}
                            </td>
                        </tr>
                    ) : (
                        books.map(book => (
                            <tr key={book.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '14px 20px', fontSize: '0.95rem', color: '#9ca3af' }}>{book.id}</td>
                                <td style={{ padding: '14px 20px', fontSize: '0.95rem', fontWeight: '700', color: '#1f2937' }}>{book.title}</td>
                                <td style={{ padding: '14px 20px', fontSize: '0.95rem', color: '#4b5563' }}>{book.author}</td>
                                <td style={{ padding: '14px 20px', fontSize: '0.95rem', color: '#374151' }}>{book.price.toLocaleString()}원</td>
                                <td style={{ padding: '14px 20px' }}>
                                        <span style={{
                                            padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', display: 'inline-block', textAlign: 'center',
                                            backgroundColor: book.available ? '#e6f4ea' : '#fce8e6', color: book.available ? '#137333' : '#c5221f'
                                        }}>
                                            {book.available ? '대출 가능' : '대출 중'}
                                        </span>
                                </td>
                                <td style={{ padding: '14px 20px' }}>
                                    <button
                                        onClick={() => router.push(`/books/${book.id}`)}
                                        style={{
                                            padding: '6px 14px', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px',
                                            cursor: 'pointer', fontSize: '0.85rem', color: '#374151', fontWeight: '500'
                                        }}
                                    >
                                        정보 수정
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}