import React from 'react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

const Header = () => {
    return (
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                height: '60px',
                background: 'var(--header-bg)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                <Link href="/" style={{ textDecoration: 'none', marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Image
                        src="/next.svg"
                        alt="Cursive Generator Logo"
                        width={40}
                        height={40}
                        style={{ display: 'block' }}
                    />
                    <span className={dancingScript.className} style={{ 
                        fontSize: '1.5rem', 
                        margin: 0, 
                        fontWeight: 400, 
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
                        backgroundSize: '300% 300%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'gradient 5s ease infinite'
                    }}>
                        Cursive Generator
                    </span>
                </Link>

                <div style={{ marginLeft: 'auto' }}>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
