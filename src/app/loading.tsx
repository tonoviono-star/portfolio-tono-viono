import SplitFlapText from '@/components/SplitFlapText/SplitFlapText';
import LetterGlitch from '@/components/LetterGlitch/LetterGlitch';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <main className={styles.screen} aria-label="Memuat portfolio Tono Viono">
      <div className={styles.glitchBg} aria-hidden="true">
        <LetterGlitch
          glitchColors={['#ffffff', '#61dca3', '#d6ed9f']}
          baseColor="#f2eee3"
          baseOpacity={0.18}
          glitchAmount={0.55}
          speed={1.2}
          flow={0.5}
          clickEffect="tear"
        />
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>PERSONAL WEBSITE</p>
        <SplitFlapText
          words={["PORTFOLIO", "TONOVIONO"]}
          flipDuration={0.12}
          stagger={0.06}
          flipsPerChar={8}
          charset="alphanumeric"
          order="left"
          align="left"
          tileStyle="board"
          tileColor="#111827"
          textColor="#f8fafc"
          glare={0}
          depth={0.5}
          tileRadius={8}
          gap={6}
          fontSize={52}
          cycleDelay={700}
          loop={false}
          padTo={9}
          intro
        />
        <p className={styles.status}><span /> MEMUAT PORTFOLIO</p>
      </div>
    </main>
  );
}
