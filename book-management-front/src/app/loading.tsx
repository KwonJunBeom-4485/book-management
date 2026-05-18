'use client';
import BookSkeleton from '@/components/BookSkeleton';

export default function Loading() {
    // 💡 화면에 미리 보여줄 가짜 행(Row)의 개수 5개 생성
    const dummyRows = Array.from({ length: 5 });

    return (
        <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>

            {/* 1. 상단 헤더 부분 스켈레톤 플레이스홀더 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '6px', width: '320px', height: '32px', animation: 'skeleton-row-pulse 1.5s infinite ease-in-out' }} />
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '6px', width: '100px', height: '42px', animation: 'skeleton-row-pulse 1.5s infinite ease-in-out' }} />
            </div>

            {/* 2. 테이블 뼈대 렌더링 */}
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
                    {/* 💡 <tr> 한 줄 단위로 일렁이는 스켈레톤 컴포넌트를 꽂아줍니다 */}
                    {dummyRows.map((_, i) => (
                        <BookSkeleton key={i} />
                    ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes skeleton-row-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}