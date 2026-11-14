import SplitFlapText from '@/components/SplitFlapText/SplitFlapText';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <main className={styles.screen} aria-label="Memuat portfolio Tono Viono">
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
