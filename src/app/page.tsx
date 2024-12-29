import React from 'react'
import { Button } from '@/_shared/components/ui/button'
import styles from './page.module.scss'

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <span className={styles.container__onBaording__title}>
          How to start
        </span>
        <div className={styles.container__onBoarding__steps}>
          <span>1. 페이지 만들기</span>
          <span>2. 페이지 보드 추가</span>
        </div>
        {/* 페이지 추가 버튼 */}
        <Button
          variant="outline"
          className="w-full bg-transparent text-orange-400 border-orange-400 hover:text-orange-500 hover:bg-orange-50"
        >
          다음 페이지 이동
        </Button>
      </div>
    </div>
  )
}

export default Home
