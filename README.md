# table-of-contents

##Descriptions
The TableOfContents component provides a dynamic, interactive table of contents for your content. It highlights the currently active section based on the user's scroll position and allows for smooth navigation through headings in your document.

##Installation
First, install the package from npm:

```bash
npm install table-of-contents-tk
```

Or use yarn

```bash
yarn add install table-of-contents-tk
```

##Usage

```javascript
import React, { useRef } from 'react';
import TableOfContents from 'table-of-contents-tk';

const MyComponent = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <TableOfContents
                contentRef={contentRef}
                offsetTop={10}
                activeColor="#03a9f4"
                defaultColor="black"
            />
            <div ref={contentRef}>
                <h1 id="section1">Section 1</h1>
                <p>Content of section 1...</p>
                <h2 id="section1-1">Section 1.1</h2>
                <p>Content of section 1.1...</p>
                <h2 id="section1-2">Section 1.2</h2>
                <p>Content of section 1.2...</p>
                <h1 id="section2">Section 2</h1>
                <p>Content of section 2...</p>
                <h2 id="section2-1">Section 2.1</h2>
                <p>Content of section 2.1...</p>
                <!-- More content -->
            </div>
        </div>
    );
};

export default MyComponent;

```

##Props
| Prop | Description | Type | Default |
|contentRef |A reference to the content container where the headings are located.| React.RefObject<HTMLDivElement>|
|offsetTop|An optional offset from the top of the viewport for calculating the active heading.| number| 0
|activeColor |An optional color for the active heading link. |string| #03a9f4
|defaultColor |An optional color for the non-active heading links.| string| black

##Style
To style the component, you can use the provided class names and apply custom CSS as needed
Here is example:

```css
.table-of-content-tk {
  /* your styles */
}

.table-of-content-tk nav ul {
  list-style: none;
  padding: 0;
}

.table-of-content-tk nav ul li {
  margin: 5px 0;
}

.table-of-content-tk nav ul li a {
  text-decoration: none;
}
```

##Table of Contents Utility Functions
In addition to the TableOfContents component, this package provides utility functions for manually managing the table of contents (TOC) in your React applications. These functions can be used to customize the behavior of your TOC or to integrate it with other components or libraries.

### Utility Functions

| Function             | Parameters                                                      | Description                                                                           |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `generateId`         | `text: string`, `level: number`, `index: number`                | Generates a unique ID for a heading element based on its text, level, and index.      |
| `renderHeadingsData` | `contentRef: React.RefObject<HTMLDivElement>`                   | Extracts heading elements from the specified content container.                       |
| `firstHandle`        | `headings: Heading[]`, `offsetTop: number \| null \| undefined` | Handles the initial page load by scrolling to the heading specified in the URL hash.  |
| `handleScroll`       | `headings: Heading[]`, `offsetTop: number \| null \| undefined` | Updates the active heading based on the user's scroll position.                       |
| `handleClick`        | `id: string`                                                    | Handles the click event for a heading link, smoothly scrolling to the target section. |

### Parameters

| Parameter    | Description                                      | Type                              |
| ------------ | ------------------------------------------------ | --------------------------------- |
| `text`       | The text content of the heading.                 | `string`                          |
| `level`      | The level of the heading.                        | `number`                          |
| `index`      | The index of the heading.                        | `number`                          |
| `contentRef` | A reference to the content container.            | `React.RefObject<HTMLDivElement>` |
| `headings`   | An array of heading objects.                     | `Heading[]`                       |
| `offsetTop`  | An optional offset from the top of the viewport. | `number \| null \| undefined`     |
| `id`         | The ID of the heading to scroll to.              | `string`                          |

###Usage example

```javascript
import React, { useRef, useEffect, useState } from 'react';
import { renderHeadingsData, firstHandle, handleScroll, handleClick } from 'table-of-contents-tk';

const CustomTableOfContents = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const newHeadings = renderHeadingsData(contentRef);
      setHeadings(newHeadings);
      const initialActiveId = firstHandle(newHeadings, 60);
      if (initialActiveId) {
        setActiveId(initialActiveId);
      }
    }
  }, [contentRef]);

  useEffect(() => {
    const onScroll = () => {
      const newActiveId = handleScroll(headings, 60);
      setActiveId(newActiveId);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headings]);

  const onHeadingClick = (id: string) => {
    handleClick(id);
    setActiveId(id);
  };

  return (
    <div>
      <nav>
        <ul>
          {headings.map((heading) => (
            <li key={heading.id} style={{ paddingLeft: (heading.level - 1) * 10 }}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onHeadingClick(heading.id);
                }}
                style={{ color: activeId === heading.id ? 'blue' : 'black' }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div ref={contentRef}>
        <h1 id="section1">Section 1</h1>
        <p>Content of section 1...</p>
        <h2 id="section1-1">Section 1.1</h2>
        <p>Content of section 1.1...</p>
        <h2 id="section1-2">Section 1.2</h2>
        <p>Content of section 1.2...</p>
        <h1 id="section2">Section 2</h1>
        <p>Content of section 2...</p>
        <h2 id="section2-1">Section 2.1</h2>
        <p>Content of section 2.1...</p>
        <!-- More content -->
      </div>
    </div>
  );
};

export default CustomTableOfContents;

```
