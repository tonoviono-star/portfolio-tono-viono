// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

import Folder from '@/components/Folder/Folder';
import AccordionGallery from '@/components/AccordionGallery/AccordionGallery';
import FlexCarousel from '@/components/FlexCarousel/FlexCarousel';

type WorkFile = { title: string; image: string; alt: string; group: string; href?: string };
type WorkGroup = 'karya' | 'sertifikat' | 'penghargaan';

const karya: WorkFile[] = [
  ['Games Petualangan Pertiwi', 'Petualangan%20Pertiwi.png', 'https://tonoviono.github.io/petualanganpertiwi/'],
  ['Ekosistem Administrasi Pembelajaran MTsN 6 Aceh Timur', 'Ekosistem%20Aplikasi.png', 'https://script.google.com/a/macros/madrasah.kemenag.go.id/s/AKfycbz2BkY_jydIeTHUx0nFQJndS0fE-lR7ABtqnTdhd4OYv9DHjfOoEaizsjdtV5YRElBwxQ/exec'],
  ['LITO — Literacy Interactive Training Online', 'LITO.png', 'https://script.google.com/macros/s/AKfycbz3q5MYRkXhNINwnfBmhM6iZgemW-6WT6UCyVX1cdbm--CydTS_eTAlqQp-TyUA2Klutw/exec'],
  ['Multimedia Interaktif Berani Berdiskusi Terintegrasi Moderasi Beragama', 'Moderasi%20Beragama.png', 'https://drive.google.com/file/d/1HXhRYO45_hwZoCWhzbU3mZfoNLDbkaMc/view'],
  ['Eco-Mineapoly — Board Game Monopoli Digital', 'Ekosistem%20Aplikasi.png', 'https://eco-mineopoly.ai.studio'],
  ['Clash of Champions — Kuis Interaktif', 'Clash%20Of%20Champions.png', 'https://script.google.com/macros/s/AKfycby4J2w-DFOIosU9A7B4VunF7vB5_7zvy0X0s2JNxGS-21vkdbuIxk67lbseshHAjwqM/exec']
].map(([title, file, href]) => ({ title, image: `/assets/works/karya/${file}`, alt: `Karya inovasi pembelajaran: ${title}`, group: 'Karya inovasi', href }));

const sertifikat: WorkFile[] = Array.from({ length: 29 }, (_, index) => {
  const fileNumber = index + 11;
  return { title: `Sertifikat Pelatihan ${String(index + 1).padStart(2, '0')}`, image: `/assets/works/sertifikat/PORTOFOLIO_${fileNumber}.png`, alt: `Sertifikat pelatihan ${index + 1}`, group: 'Sertifikat pelatihan' };
});

const penghargaan: WorkFile[] = [10, 6, 7, 8, 9].map((fileNumber, index) => ({
  title: `Piagam Penghargaan ${String(index + 1).padStart(2, '0')}`,
  image: `/assets/works/penghargaan/PORTOFOLIO_${fileNumber}.png`,
  alt: `Piagam penghargaan ${index + 1}`,
  group: 'Penghargaan'
}));

const videoItems = [
  ['Et5yb7TiHKI', 'Karya video 01'],
  ['jgLmARPERU0', 'Karya video 02', 't=16'],
  ['0Lk9pZsSI-Q', 'Karya video 03', 't=41'],
  ['e6GIVLGvWFg', 'Karya video 04'],
  ['v5YaIhjUi4A', 'Karya video 05']
].map(([id, title, query]) => ({ src: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, title, alt: `Thumbnail YouTube ${title}`, href: `https://www.youtube.com/watch?v=${id}${query ? `&${query}` : ''}` }));

const allFiles = [...karya, ...sertifikat, ...penghargaan];

function downloadFile(file: WorkFile) {
  const anchor = document.createElement('a');
  anchor.href = file.image;
  anchor.download = file.title.replaceAll(' ', '-').toLowerCase() + '.png';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export default function WorksSection() {
  const [activeGroup, setActiveGroup] = useState<WorkGroup>('karya');
  const [mounted, setMounted] = useState(false);
  const [webgl2Available, setWebgl2Available] = useState<boolean | null>(null);
  const galleryFiles = activeGroup === 'karya' ? karya : activeGroup === 'sertifikat' ? sertifikat : penghargaan;
  const galleryName = activeGroup === 'karya' ? 'Karya inovasi pembelajaran' : activeGroup === 'sertifikat' ? 'Sertifikat pelatihan' : 'Penghargaan';

  const openGalleryItem = (item: { image: string; text?: string; alt?: string; href?: string }) => {
    const file = galleryFiles.find((entry) => entry.image === item.image);
    if (file?.href) {
      window.open(file.href, '_blank', 'noopener,noreferrer');
      return;
    }
    downloadFile(file || { title: item.text || 'dokumen', image: item.image, alt: item.alt || '', group: '' });
  };

  useEffect(() => {
    const canvas = document.createElement('canvas');
    setWebgl2Available(Boolean(canvas.getContext('webgl2')));
    setMounted(true);
  }, []);

  return (
    <section id="works" className="works-section" aria-labelledby="works-title">
      <div className="works-inner">
        <header className="works-heading">
          <p>Works</p>
          <h2 id="works-title">Arsip karya<br />dan proses.</h2>
          <span>Jelajahi koleksi, lalu klik berkas untuk mengunduhnya.</span>
        </header>

        <div className="works-folders">
          {mounted ? <>
            <Folder mode="book" variant="glass" color="#000000" paperColor="#e9e7df" theme="dark" label="Karya inovasi" items={karya} zoomOnClick={false} onOpenChange={(open) => open && setActiveGroup('karya')} />
            <Folder mode="book" variant="glass" color="#000000" paperColor="#e9e7df" theme="dark" label="Sertifikat pelatihan" items={sertifikat} zoomOnClick={false} onOpenChange={(open) => open && setActiveGroup('sertifikat')} />
            <Folder mode="book" variant="glass" color="#000000" paperColor="#e9e7df" theme="dark" label="Penghargaan" items={penghargaan} zoomOnClick={false} onOpenChange={(open) => open && setActiveGroup('penghargaan')} />
          </> : <div className="works-reactbits-placeholder" aria-hidden="true" />}
        </div>

        <section className="works-gallery-section" aria-labelledby="files-title">
          <div className="works-section-heading">
            <p>Dokumen</p>
            <h3 id="files-title">{galleryName}.</h3>
            <span>{galleryFiles.length} file · {activeGroup === 'karya' ? 'klik untuk akses' : 'klik untuk unduh'}</span>
          </div>
          <div className="works-accordion-gallery">
            {mounted ? <AccordionGallery
              key={activeGroup}
              items={galleryFiles.map((file) => ({ image: file.image, label: file.title, alt: file.alt, link: file.href, file }))}
              defaultIndex={0}
              accentColor="#d6ed9f"
              overlayColor="#000000"
              textColor="#f2eee3"
              height={560}
              gap={10}
              radius={18}
              expandRatio={0.56}
              trigger="hover"
              onItemClick={(item) => !item.link && downloadFile(item.file)}
            /> : <div className="works-reactbits-placeholder" aria-hidden="true" />}
          </div>
        </section>

        <section className="works-video-section" aria-labelledby="video-title">
          <div className="works-section-heading">
            <p>Video</p>
            <h3 id="video-title">Karya dalam gerak.</h3>
            <span>5 video YouTube · klik untuk menonton</span>
          </div>
          <div className="works-flex-carousel">
            {mounted && webgl2Available === false ? (
              <div className="works-video-fallback">
                {videoItems.map((item) => <button type="button" key={item.href} onClick={() => window.open(item.href, '_blank', 'noopener,noreferrer')}><img src={item.src} alt={item.alt} /><span>{item.title} · YouTube ↗</span></button>)}
              </div>
            ) : mounted && webgl2Available ? <FlexCarousel items={videoItems} preset="liquid" intro="rise" cardHeight={0.52} gap={12} squeeze={0.2} focusOnClick captions onSelect={(_, item) => window.open(item.href, '_blank', 'noopener,noreferrer')} /> : <div className="works-reactbits-placeholder" aria-hidden="true" />}
          </div>
        </section>
      </div>
    </section>
  );
}
