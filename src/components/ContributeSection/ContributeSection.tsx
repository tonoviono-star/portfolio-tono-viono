'use client';

import { FormEvent, useState } from 'react';
import DriftWall from '@/components/DriftWall/DriftWall';
import TrueFocus from '@/components/TrueFocus/TrueFocus';
import InteractivePortrait from '@/components/InteractivePortrait/InteractivePortrait';

const contacts = [
  { name: 'WhatsApp', value: '+62 821 9910 9157', href: 'https://wa.me/6282199109157', icon: 'wa' },
  { name: 'Instagram', value: '@madah.kelana', href: 'https://www.instagram.com/madah.kelana?exln=cnJ4bDFodzgxNmRm', icon: 'ig' },
  { name: 'TikTok', value: '@tonoviono', href: 'https://www.tiktok.com/@tonoviono?_r=1&_t=ZS-9BO7ggdlJsS', icon: 'tk' },
  { name: 'Email', value: 'tonoviono@gmail.com', href: 'mailto:tonoviono@gmail.com', icon: 'mail' }
];

const driftWallItems = [
  ['1213.jpeg', 'Tono Viono'],
  ['d38bdac8-1264-41f0-98e8-aa9a2a344a4c.jpg', 'Tono Viono'],
  ['DSC_0574%20copy.jpg', 'Tono Viono'],
  ['WhatsApp%20Image%202025-02-10%20at%202.48.08%20PM.jpg', 'Tono Viono']
].flatMap(([fileName, title]) => Array.from({ length: 5 }, () => ({
  image: `/assets/drift-wall/${fileName}`,
  title,
  href: undefined
})));

function ContactIcon({ kind }: { kind: string }) {
  if (kind === 'mail') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  if (kind === 'wa') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.4A8.4 8.4 0 1 1 20.5 11.7Z" /><path d="M8.6 7.6c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.3.1.5-.1.7l-.6.7c.5 1 1.3 1.8 2.3 2.3l.7-.6c.2-.2.4-.2.7-.1l1.9.8c.3.1.4.3.4.5v.5c0 .3-.1.5-.5.7-.6.3-1.4.2-2.5-.3-2.6-1.2-4.6-3.2-5.8-5.8-.5-1.1-.6-1.9-.3-2.5Z" /></svg>;
  if (kind === 'ig') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4.2c.8-.1 1.7-.5 2.3-1.1v4.4a5.6 5.6 0 0 1-3.2-1v7.1a5.1 5.1 0 1 1-4.4-5.1v2.6a2.6 2.6 0 1 0 1.8 2.5V4.2h3.5Z" /></svg>;
}

export default function ContributeSection() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="connect-intro" aria-label="Let us connect">
        <InteractivePortrait />
        <div className="connect-intro-overlay">
          <TrueFocus sentence="LET US CONNECT" separator=" " focusStyle="brackets" borderColor="#d6ed9f" glowColor="rgb(214 237 159 / 38%)" highlightColor="#f2eee3" blurAmount={5} focusScale={1.05} unfocusedOpacity={0.42} animationDuration={0.55} pauseBetweenAnimations={1.1} />
        </div>
      </section>
      <section className="drift-wall-section" aria-label="Galeri foto Tono Viono">
        <DriftWall
          items={driftWallItems}
          columns={5}
          tileWidth={220}
          tileHeight={146}
          gap={18}
          speed={32}
          direction="up"
          tilt={14}
          turn={-12}
          parallax={0.7}
          pauseOnHover={false}
          overlayColor="transparent"
          fade={0.45}
          style={{}}
        />
      </section>
      <section id="contribute" className="contribute-section" aria-labelledby="contribute-title">
        <div className="contribute-inner">
          <header>
            <p>Contribute</p>
            <h2 id="contribute-title">Mari bicara<br />tentang ide.</h2>
          </header>
          <div className="contribute-grid">
            <form className="comment-form" onSubmit={handleSubmit}>
              <label>Nama<input required name="name" type="text" placeholder="Nama Anda" /></label>
              <label>Email<input required name="email" type="email" placeholder="email@anda.com" /></label>
              <label>Pesan<textarea required name="message" rows={6} placeholder="Tulis komentar atau ide Anda di sini…" /></label>
              <button type="submit">{sent ? 'Pesan terkirim ✓' : 'Kirim komentar'} <span>↗</span></button>
            </form>
            <div className="contact-list">
              <p>Hubungi saya</p>
              {contacts.map((contact) => <a key={contact.name} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}><ContactIcon kind={contact.icon} /><span><small>{contact.name}</small><strong>{contact.value}</strong></span><i>↗</i></a>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
