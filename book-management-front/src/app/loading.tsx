// src/app/loading.tsx
export default function Loading() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#666'
        }}>
            ⏳ 데이터를 불러오는 중입니다...
        </div>
    );
}