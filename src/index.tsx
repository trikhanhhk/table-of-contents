import React, { useEffect, useState } from 'react';
import { firstHandle, handleClick, handleScroll, renderHeadingsData } from './master';

interface Heading {
    id: string;
    text: string;
    level: number;
}

type Props = {
    contentRef: React.RefObject<HTMLDivElement>;
    offsetTop?: number;
    activeColor?: string;
    defaultColor?: string;
}

const TableOfContents: React.FC<Props> = (props) => {
    const { contentRef, offsetTop, activeColor, defaultColor } = props;

    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (contentRef.current) {
            const newHeadings = renderHeadingsData(contentRef);

            setHeadings(newHeadings);

            const currentHash = firstHandle(headings, offsetTop);

            if (currentHash) {
                setActiveId(currentHash);
            }
        }
    }, [contentRef]);

    useEffect(() => {
        const handleScrollThis = () => {
            if (headings.length === 0) return;

            const activeId = handleScroll(headings, offsetTop);

            setActiveId(activeId);
        };

        window.addEventListener('scroll', handleScrollThis);
        return () => {
            window.removeEventListener('scroll', handleScrollThis);
        };
    }, [headings]);

    const handleClickThis = (id: string) => {
        setActiveId(id);
        handleClick(id);
    };

    return (
        <div className='table-of-content-tk'>
            <nav>
                <ul>
                    {headings.map((heading) => (
                        <li key={heading.id} style={{ paddingLeft: (heading.level - 1) * 8 + 5, borderLeft: activeId === heading.id ? `3px solid ${activeColor ? activeColor : "#03a9f4"}` : "none" }}>
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClickThis(heading.id);
                                }}
                                style={{ color: activeId === heading.id ? activeColor ? activeColor : '#03a9f4' : defaultColor ? defaultColor : 'black' }}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default TableOfContents;
