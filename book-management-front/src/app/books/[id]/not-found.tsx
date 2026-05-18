'use client';
import Link from 'next/link';

export default function BookNotFound() {
    return (
        <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#dc2626', marginBottom: '16px', fontWeight: 'bold' }}>
                ⚠️ 존재하지 않는 도서 정보
            </h2>
            <p style={{ color: '#4b5563', fontSize: '1.05rem', marginBottom: '32px' }}>
                요청하신 고유 ID의 도서 데이터를 찾을 수 없거나 시스템에서 삭제되었습니다.
            </p>
            <Link href="/" style={{
                padding: '12px 24px', backgroundColor: '#1a73e8', color: '#fff',
                textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold'
            }}>
                도서 목록으로 돌아가기
            </Link>
        </div>
    );
}