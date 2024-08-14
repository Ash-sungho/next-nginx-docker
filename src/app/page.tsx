// app/page.tsx
import Image from 'next/image'
import instance from '@/_shared/AxiosInstance'
import styles from './page.module.css'

const Home = async () => {
  interface UserProfile {
    full_name: string
    id: string
    is_new: boolean
    is_private: boolean
    is_verified: boolean
    latest_reel_media: number
    profile_pic_id: string
    profile_pic_url: string
    username: string
  }

  interface Items {
    items: UserProfile[]
  }

  // 서버에서 직접 데이터 가져오기
  const result = await instance.get<Items>(
    '/v1/likes?code_or_id_or_url=CxYQJO8xuC6',
  )

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            NGINX <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            NEXT <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>

      <h1>프로필 이미지 목록</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {result.data.items.map((item) => (
          <div key={item.id} style={{ textAlign: 'center' }}>
            <Image
              src={item.profile_pic_url}
              alt={item.full_name}
              width={150}
              height={150}
              style={{ borderRadius: '50%' }}
            />
            <p>{item.full_name}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Home
