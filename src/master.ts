import React from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export const generateId = (text: string, level: number, index: number): string => {
  return `heading-${level}-${index}`;
};

export const renderHeadingsData = (contentRef: React.RefObject<HTMLDivElement>): Heading[] => {
  const newHeadings: Heading[] = [];
  if (contentRef.current) {
    const headingElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headingElements.forEach((heading, index) => {
      const element = heading as HTMLElement;

      if (!element.id) {
        element.id = generateId(element.innerText, parseInt(element.tagName.substring(1)), index);
      }

      newHeadings.push({
        id: element.id,
        text: element.innerText,
        level: parseInt(element.tagName.substring(1)),
      });
    });
  }

  return newHeadings;
}

export const firstHandle = (headings: Heading[], offsetTop: number | null | undefined) => {
  const currentHash = window.location.hash.substring(1);
  if (currentHash) {
    const activeHeading = headings.find(heading => heading.id === currentHash);
    if (activeHeading) {
      const element = document.getElementById(currentHash);
      if (element) {
        const offset = offsetTop ? offsetTop : 60;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    return currentHash;
  }

  return null;
}

export const handleScroll = (headings: Heading[], offsetTop: number | undefined | null) => {

  let activeId = headings[0].id;
  const offset = offsetTop ? offsetTop : 60;
  const fromTop = window.scrollY + offset;

  for (let i = 0; i < headings.length; i++) {
    const element = document.getElementById(headings[i].id);
    if (element && element.offsetTop <= fromTop) {
      activeId = headings[i].id;
    } else {
      break;
    }
  }

  window.history.pushState(null, '', `#${activeId}`);

  return activeId;
}

export const handleClick = (id: string) => {

  const element = document.getElementById(id);
  if (element) {
    const offset = 60;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    window.history.pushState(null, '', `#${id}`);
  }
};