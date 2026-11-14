'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import RubberSegment from '@/components/RubberSegment/RubberSegment';
import SplitFlapText from '@/components/SplitFlapText/SplitFlapText';
import AboutSection from '@/components/AboutSection/AboutSection';
import WorksSection from '@/components/WorksSection/WorksSection';
import ContributeSection from '@/components/ContributeSection/ContributeSection';

type TimelineItem = {
  id: string;
  year: string;
  institution: string;
  title: string;
  meta: string;
  detail: string;
  province: string;
  mapProvince: string;
};

const educationTimeline: TimelineItem[] = [
  {
    id: 'upi',
    year: '2010 — 2015',
    institution: 'Universitas Pendidikan Indonesia',
    title: 'Pendidikan Bahasa Indonesia',
    meta: 'Sarjana · Pendidikan',
    detail: 'Membangun fondasi pedagogi, bahasa, dan literasi sebagai dasar praktik mengajar.',
    province: 'Jawa Barat',
    mapProvince: 'JAWA BARAT'
  },
  {
    id: 'unisma',
    year: '2022 — 2024',
    institution: 'Universitas Islam Malang',
    title: 'Magister Pendidikan Bahasa Indonesia',
    meta: 'Magister · Pendidikan',
    detail: 'Memperdalam riset pembelajaran bahasa Indonesia serta inovasi pembelajaran berbasis teknologi.',
    province: 'Jawa Timur',
    mapProvince: 'JAWA TIMUR'
  }
];

const workTimeline: TimelineItem[] = [
  {
    id: 'tridaya',
    year: '2014 — 2016',
    institution: 'Tutor Bimbel Tridaya',
    title: 'Tutor Pendidikan',
    meta: 'Bimbingan belajar',
    detail: 'Mengajar bimbingan belajar dengan konsentrasi terpadu dalam kelompok kecil berisi satu hingga enam peserta didik.',
    province: 'Jawa Barat',
    mapProvince: 'JAWA BARAT'
  },
  {
    id: 'sm3t',
    year: '2017 — 2018',
    institution: 'Guru SM3T Kabupaten Asmat',
    title: 'Guru Bahasa Indonesia',
    meta: 'Distrik Sawa Erma · Papua',
    detail: 'Mengajar di pedalaman Kabupaten Asmat selama satu tahun, beradaptasi dengan kebutuhan dan konteks belajar setempat.',
    province: 'Papua Selatan',
    mapProvince: 'PAPUA'
  },
  {
    id: 'kemenag',
    year: '2019 — Sekarang',
    institution: 'Guru PNS Kementerian Agama',
    title: 'Guru Ahli Pertama',
    meta: 'Pendidikan formal',
    detail: 'Mengajar Bahasa Indonesia dengan fokus pada literasi kritis, pembelajaran interaktif, dan perkembangan peserta didik.',
    province: 'Aceh',
    mapProvince: 'DI. ACEH'
  },
  {
    id: 'wakamad',
    year: '2021 — Sekarang',
    institution: 'Wakamad Bidang Kurikulum',
    title: 'Pengembangan Kurikulum',
    meta: 'Manajemen pendidikan',
    detail: 'Mengembangkan, memonitor, dan melakukan supervisi pembelajaran untuk mendukung tata kelola madrasah yang efektif.',
    province: 'Aceh',
    mapProvince: 'DI. ACEH'
  }
];

const publications = [
  {
    year: '2026',
    type: 'Proceedings',
    title: 'Measuring Inter-Relation of Universal Design of Learning Within Differentiated Instruction: An Insight from Indonesia',
    authors: 'Affied Alfayed, Ria Asih, Tono Viono',
    source: 'Proceedings of the 3rd International Conference on Education (ICE-3 2025), Vol. 995 · Atlantis Press'
  },
  {
    year: '2024',
    type: 'Journal article',
    title: 'Prinsip Paritas Partisipasi dalam Midah Simanis Bergigi Emas: Analisis Wacana Perspektif Feminisme Kritis',
    authors: 'Jagad Wijaksono, Tono Viono',
    source: 'Imajeri: Jurnal Pendidikan Bahasa dan Sastra, 6(2), 248–259'
  },
  {
    year: '2024',
    type: 'Journal article',
    title: 'Dimensi Reward dan Punishment dalam Pendidikan: Perspektif Hierarki Kebutuhan Maslow',
    authors: 'Khusnul Fatimah, Valdi Giffari Rahmayati Putra, Tono Viono, Hasan Busri',
    source: 'As-Sabiqun, 6(4), 682–708'
  },
  {
    year: '2024',
    type: 'Thesis',
    title: 'Fenomena Abreviasi Baru dalam Pesan Twitter: Kajian Linguistik Posmodern Paul Virilio dan Jean Baudrillard',
    authors: 'Tono Viono',
    source: 'Universitas Islam Malang'
  },
  {
    year: '2024',
    type: 'Journal article',
    title: 'Strengthening Religious Moderation Awareness Among Post-Conflict Students’ Through Interactive Indonesian Language Learning',
    authors: 'Akhmad Tabrani, Tono Viono',
    source: 'KEMBARA: Jurnal Keilmuan Bahasa, Sastra, dan Pengajarannya, 10(2), 621–634'
  }
];

export default function HomeExperience() {
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(workTimeline[2]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="page">
      <div className={`loading ${!loading ? 'loadingdone' : ''}`} aria-hidden={!loading}>
        <div className="loadingtop" />
        <div className="loadingbottom" />
        <div className="loadingmark">
          <SplitFlapText words={["PORTFOLIO", "TONOVIONO"]} fontSize={42} tileColor="#111827" textColor="#f8fafc" tileRadius={5} gap={5} flipsPerChar={5} stagger={0.035} flipDuration={0.08} cycleDelay={300} loop={false} depth={0.5} intro />
        </div>
      </div>

      <header className="header">
        <a className="logo" href="#home" aria-label="Tono Viono home">TV<span>®</span></a>
        <RubberSegment
          items={['Home', 'About Me', 'Experiences', 'Works', 'Contribute']}
          defaultValue="Home"
          onChange={(value) => document.getElementById(value.toLowerCase().replaceAll(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}
        />
        <span className="availability"><i /> Available for select work</span>
      </header>

      <HeroSequence />

      <AboutSection />
      <section id="experiences" className="experience-section" aria-labelledby="experience-title">
        <div className="experience-contours" aria-hidden="true" />
        <div className="experience-inner">
          <div className="experience-heading">
            <p>Experiences</p>
            <h2 id="experience-title">Pendidikan<br />&amp; pekerjaan.</h2>
            <span>Tekan entri untuk melihat fokus peran.</span>
          </div>

          <div className="experience-timelines">
            <TimelineColumn title="Pendidikan" items={educationTimeline} activeId={selectedExperience.id} onSelect={setSelectedExperience} />
            <TimelineColumn title="Pekerjaan" items={workTimeline} activeId={selectedExperience.id} onSelect={setSelectedExperience} />
          </div>

          <aside className="experience-detail" aria-live="polite">
            <span className="experience-detail-label">Fokus peran · {selectedExperience.meta}</span>
            <div>
              <p>{selectedExperience.year}</p>
              <h3>{selectedExperience.title}</h3>
              <strong>{selectedExperience.institution}</strong>
            </div>
            <p className="experience-detail-copy">{selectedExperience.detail}</p>
          </aside>

          <ExperienceMap
            activeProvince={selectedExperience.province}
            activeMapProvince={selectedExperience.mapProvince}
            onSelect={(province) => {
              const matchingEntry = [...educationTimeline, ...workTimeline].find((item) => item.mapProvince === province);
              if (matchingEntry) setSelectedExperience(matchingEntry);
            }}
          />

          <section className="scholar-publications" aria-labelledby="publications-title">
            <div className="scholar-publications-heading">
              <div>
                <p>Google Scholar</p>
                <h3 id="publications-title">Publikasi terbaru.</h3>
              </div>
              <a href="https://scholar.google.com/citations?user=oPT0DgMAAAAJ&hl=en" target="_blank" rel="noreferrer">Lihat semua <span aria-hidden="true">↗</span></a>
            </div>
            <ol>
              {publications.map((publication, index) => (
                <li key={publication.title}>
                  <a href="https://scholar.google.com/citations?user=oPT0DgMAAAAJ&hl=en" target="_blank" rel="noreferrer" aria-label={`Buka ${publication.title} di Google Scholar`}>
                    <span className="publication-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="publication-year">{publication.year}</span>
                    <span className="publication-content">
                      <span className="publication-type">{publication.type}</span>
                      <strong>{publication.title}</strong>
                      <span>{publication.authors}</span>
                      <em>{publication.source}</em>
                    </span>
                    <span className="publication-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
      <WorksSection />
      <ContributeSection />
    </main>
  );
}

function HeroSequence() {
  const [visual, setVisual] = useState({ frame: 1, next: 2, blend: 0, shift: 0 });

  useEffect(() => {
    let targetProgress = 0;
    let smoothProgress = 0;
    let animationFrame = 0;
    let lastWheel = 0;
    let sequenceIndex = 0;
    let releasedToPage = false;
    const updateVisual = () => {
      smoothProgress += (targetProgress - smoothProgress) * 0.16;
      const rawFrame = smoothProgress * 25;
      const frame = Math.min(25, Math.floor(rawFrame)) + 1;
      setVisual({ frame, next: Math.min(26, frame + 1), blend: rawFrame - Math.floor(rawFrame), shift: smoothProgress });
      animationFrame = window.requestAnimationFrame(updateVisual);
    };
    const onScroll = () => {
      const hero = document.getElementById('home');
      if (!hero) return;
      if (releasedToPage) {
        targetProgress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight)));
      }
    };
    const onWheel = (event: WheelEvent) => {
      const hero = document.getElementById('home');
      if (!hero || releasedToPage || Math.abs(event.deltaY) < 2) return;
      const heroRect = hero.getBoundingClientRect();
      const heroActive = heroRect.top <= 1 && heroRect.bottom >= window.innerHeight - 1;
      if (!heroActive) {
        releasedToPage = true;
        return;
      }
      const now = performance.now();
      if (now - lastWheel < 110) {
        return;
      }
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(25, Math.max(0, sequenceIndex + direction));
      if (direction > 0 && sequenceIndex === 25) {
        releasedToPage = true;
        targetProgress = 1;
        return;
      }
      if (nextIndex !== sequenceIndex) {
        sequenceIndex = nextIndex;
        targetProgress = sequenceIndex / 25;
        lastWheel = now;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    animationFrame = window.requestAnimationFrame(updateVisual);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="herosticky">
        <div className="heroimage" style={{ backgroundImage: `url('/landing-frames/ezgif-frame-${String(visual.frame).padStart(3, '0')}.jpg')`, opacity: 1 - visual.blend, transform: `translate3d(0, ${visual.shift * -42}px, 0) scale(1.08)` }} />
        <div className="heroimage heroimage-next" style={{ backgroundImage: `url('/landing-frames/ezgif-frame-${String(visual.next).padStart(3, '0')}.jpg')`, opacity: visual.blend, transform: `translate3d(0, ${visual.shift * -42}px, 0) scale(1.08)` }} />
        <div className="heroshade" />
        <div className="herocopy">
          <h1>Hi<span>.</span></h1>
        </div>
        <p className="scrollhint">SCROLL TO EXPLORE <b>↓</b></p>
      </div>
    </section>
  );
}

type ProvinceFeature = {
  type: 'Feature';
  properties: { Propinsi: string };
  geometry: { type: 'Polygon' | 'MultiPolygon'; coordinates: unknown };
};

type MapPosition = [number, number];

function getProvinceRings(feature: ProvinceFeature): MapPosition[][] {
  const coordinates = feature.geometry.coordinates;
  if (!Array.isArray(coordinates)) return [];
  if (feature.geometry.type === 'Polygon') return coordinates as MapPosition[][];
  return (coordinates as MapPosition[][][]).flat();
}

function ExperienceMap({ activeProvince, activeMapProvince, onSelect }: { activeProvince: string; activeMapProvince: string; onSelect: (province: string) => void }) {
  const [features, setFeatures] = useState<ProvinceFeature[]>([]);
  const mappedProvinces = ['DI. ACEH', 'JAWA BARAT', 'JAWA TIMUR', 'PAPUA'];

  useEffect(() => {
    let live = true;
    fetch('/data/indonesia-prov.geojson')
      .then((response) => response.json())
      .then((data: { features: ProvinceFeature[] }) => {
        if (live) setFeatures(data.features);
      })
      .catch(() => {
        if (live) setFeatures([]);
      });
    return () => { live = false; };
  }, []);

  const provincePaths = useMemo(() => {
    if (features.length === 0) return new Map<string, string>();
    const points = features.flatMap((feature) => getProvinceRings(feature).flat());
    const longitudes = points.map(([longitude]) => longitude);
    const latitudes = points.map(([, latitude]) => latitude);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);
    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);
    const scale = Math.min(864 / (maxLongitude - minLongitude), 314 / (maxLatitude - minLatitude));
    const mapWidth = (maxLongitude - minLongitude) * scale;
    const mapHeight = (maxLatitude - minLatitude) * scale;
    const offsetX = (900 - mapWidth) / 2;
    const offsetY = (350 - mapHeight) / 2;
    const coordinateToPoint = ([longitude, latitude]: [number, number]) => [offsetX + (longitude - minLongitude) * scale, offsetY + (maxLatitude - latitude) * scale];

    return new Map(features.map((feature) => {
      const path = getProvinceRings(feature)
        .map((ring) => ring.map((coordinate, index) => {
          const [x, y] = coordinateToPoint(coordinate);
          return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
        }).join('') + 'Z')
        .join('');
      return [feature.properties.Propinsi, path];
    }));
  }, [features]);

  return (
    <section className="experience-map" aria-labelledby="map-title">
      <div className="experience-map-copy">
        <p>Indonesia</p>
        <h3 id="map-title">Jejak perjalanan.</h3>
        <span>Provinsi ditampilkan berdasarkan lokasi institusi dan penugasan yang tercantum atau diperkirakan dari CV.</span>
      </div>
      <svg viewBox="0 0 900 350" role="img" aria-label={`Peta Indonesia. Lokasi aktif: ${activeProvince}`}>
        {features.map((feature) => {
          const province = feature.properties.Propinsi;
          const active = province === activeMapProvince;
          const mapped = mappedProvinces.includes(province);
          const path = provincePaths.get(province);
          return (
            <g key={province} className={`${mapped ? 'is-mapped' : ''} ${active ? 'is-active' : ''}`}>
              <path d={path} fillRule="evenodd" onClick={() => mapped && onSelect(province)} tabIndex={mapped ? 0 : -1} role={mapped ? 'button' : undefined} aria-label={mapped ? `Pilih ${province}` : undefined} onKeyDown={(event) => { if (mapped && (event.key === 'Enter' || event.key === ' ')) onSelect(province); }} />
            </g>
          );
        })}
      </svg>
      {features.length === 0 && <p className="experience-map-loading">Memuat peta Indonesia…</p>}
      <div className="experience-map-legend"><i /> Lokasi aktif: <strong>{activeProvince}</strong></div>
    </section>
  );
}

function TimelineColumn({ title, items, activeId, onSelect }: { title: string; items: TimelineItem[]; activeId: string; onSelect: (item: TimelineItem) => void }) {
  return (
    <section className="timeline-column" aria-label={title}>
      <h3>{title}</h3>
      <ol>
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className={isActive ? 'is-active' : ''}>
              <button type="button" onClick={() => onSelect(item)} aria-pressed={isActive}>
                <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="timeline-content">
                  <span className="timeline-topline"><strong>{item.institution}</strong><em>{item.year}</em></span>
                  <span className="timeline-title">{item.title}</span>
                  <span className="timeline-meta">{item.meta}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
