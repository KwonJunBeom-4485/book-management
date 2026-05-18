import Link from 'next/link';

interface BookProps {
    id: number;
    title: string;
    author: string;
    price: number;
    publishedYear: number;
    isbn: string; // 💡 사용할 데이터 수신 확인
    available: boolean;
}

export default function BookCard({ id, title, author, price, isbn, available }: BookProps) {
    return (
        <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            padding: '20px', // 안쪽 여백을 조금 더 넓혀서 가독성 확보
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '210px', // 💡 항목이 늘어났으므로 높이를 175px에서 210px로 확장 (글자 겹침 영원히 방지)
            transition: 'box-shadow 0.2s ease',
        }}>
            <div>
                {/* 도서 제목 */}
                <h3 style={{
                    margin: '0 0 10px 0',
                    color: '#111827',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis' // 제목이 너무 길면 ... 처리
                }}>
                    {title}
                </h3>

                {/* 상세 정보 리스트 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>
                        <span style={{ color: '#9ca3af', marginRight: '6px' }}>저자</span> {author}
                    </p>

                    {/* 💡 가격 표시 (원화 단위 콤마) */}
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>
                        <span style={{ color: '#9ca3af', marginRight: '6px' }}>가격</span> {price.toLocaleString()}원
                    </p>

                    {/* 💡 요청하신 ISBN 추가 파트 */}
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '0.85rem' }}>
                        <span style={{ color: '#9ca3af', marginRight: '6px' }}>ISBN</span>
                        <span style={{ fontFamily: 'monospace', color: '#6b7280' }}>{isbn || '발급 대기'}</span>
                    </p>
                </div>
            </div>

            {/* 하단 버튼 및 상태 영역 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '16px',
                borderTop: '1px solid #f3f4f6', // 구분을 위해 얇은 선 추가
                paddingTop: '12px'
            }}>
                {/* 대출 상태 표시 (whiteSpace: 'nowrap'으로 글자 쪼개짐 절대 방지) */}
                <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: available ? '#ecfdf5' : '#fef2f2',
                    color: available ? '#059669' : '#dc2626',
                    whiteSpace: 'nowrap'
                }}>
          {available ? '대출 가능' : '대출 중'}
        </span>

                {/* 상세 페이지 이동 링크 */}
                <Link href={`/books/${id}`} style={{
                    color: '#0070f3',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                }}>
                    상세 보기 →
                </Link>
            </div>
        </div>
    );
}