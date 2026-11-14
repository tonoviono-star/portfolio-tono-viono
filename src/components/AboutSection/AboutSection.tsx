'use client';

import Lanyard from '@/components/Lanyard/Lanyard';
import ScrollVelocity from '@/components/ScrollVelocity/ScrollVelocity';
import WarpText from '@/components/WarpText/WarpText';

export default function AboutSection() {
  return (
    <section id="about-me" className="about-section">
      <div className="about-content">
        <div className="about-lanyard" aria-label="Kartu identitas Tono Viono">
          <Lanyard
            frontImage="/assets/dsc-0574-copy.jpg"
            imageFit="cover"
            cardColor="#f2eee3"
            strapColor="#20241f"
            size={0.62}
            strapLength={0.88}
            gravity={1}
            damping={0.55}
            elasticity={0.48}
            breeze={0.28}
            interactive
            intro
          />
        </div>
        <div className="about-copy">
          <p className="about-kicker">About Me</p>
          <div className="about-role" aria-label="Indonesian Teacher, Researcher, EdTech Enthusiast.">
            <WarpText
              text={'Indonesian Teacher,\nResearcher,\nEdTech Enthusiast.'}
              color="#f2eee3"
              fontSize="clamp(3rem, 7.2vw, 7.3rem)"
              fontWeight={400}
              letterSpacing="-0.045em"
              lineHeight={0.98}
              textAlign="left"
              verticalAlign="top"
              warpStrength={0.075}
              warpScale={1.5}
              speed={0.5}
              pointerInfluence={0.35}
              pointerStrength={0.32}
              refraction={0.014}
              chromatic={0.02}
              idleDrift={0.16}
              intro
            />
          </div>
          <div className="about-identities" aria-label="Academic profiles">
            <a href="https://orcid.org/0009-0004-2442-4788" target="_blank" rel="noreferrer">
              <span>ORCID ID</span>
              <strong>0009-0004-2442-4788 ↗</strong>
            </a>
            <a href="https://sinta.kemdiktisaintek.go.id/authors/profile/6950725" target="_blank" rel="noreferrer">
              <span>SINTA ID</span>
              <strong>6950725 ↗</strong>
            </a>
            <a href="https://scholar.google.com/citations?user=oPT0DgMAAAAJ&hl=en" target="_blank" rel="noreferrer">
              <span>GOOGLE SCHOLAR</span>
              <strong>H-Index 4 ↗</strong>
            </a>
          </div>
          <p className="about-description">
            Berpijak pada pemikiran Ki Hajar Dewantara mengenai <strong>kodrat zaman</strong>, setiap inisiatif yang dikembangkan berfokus menjawab tantangan disrupsi era digital dan efisiensi tata kelola madrasah—melalui pembelajaran interaktif, literasi kritis, serta ekosistem aplikasi digital yang lahir dari ketulusan kepedulian terhadap peserta didik dan rekan pendidik.
          </p>
          <a className="about-cv" href="/assets/PORTOFOLIO-DAN-CV-2.pdf" download>
            Unduh CV <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <footer className="about-footer" aria-label="Innovation, learning, creative, education">
        <ScrollVelocity
          scrollContainerRef={undefined}
          texts={['INNOVATION * LEARNING * CREATIVE * EDUCATION'] as never}
          velocity={34}
          skewWithVelocity={5}
          scaleWithVelocity={0.06}
          draggable
          pauseOnHover
          fontSize="clamp(1.5rem, 3vw, 3.25rem)"
          fontWeight={700}
          color={'#f2eee3' as never}
          gap={24}
          numCopies={8}
          className="about-footer-text"
          parallaxStyle={undefined}
          scrollerStyle={undefined}
        />
      </footer>
    </section>
  );
}
