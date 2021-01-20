import Head from 'next/head'
import Image from 'next/image'
import {
  Text,
  Row,
  Spacer,
  Grid,
  Link,
  Badge,
  Image as GeistImage,
  Col
} from '@geist-ui/react'

const Project = ({
  slug,
  month,
  name,
  desc,
  color,
  embedUrl,
  url,
  standalone = false,
  ...props
}) => (
  <Col
    id={slug}
    gap={2}
    style={{
      backgroundColor: color,
      color: color.includes('#f') ? '#222' : '#fff',
      margin: 0,
      ...(standalone
        ? {
          padding: '24pt 16pt'
        }
        : {
          padding: '48pt 16pt',
          scrollSnapAlign: 'start'
        })
    }}
    {...props}
  >
    <header>
      <aside>
        <Badge
          size="large"
          style={{
            color: 'inherit',
            backgroundColor: color.includes('#f')
              ? 'rgba(0,0,0,0.0625)'
              : 'rgba(255,255,255,0.25)',
            fontWeight: 'bold',
            padding: '6px 12px',
            textTransform: 'uppercase'
          }}
        >
          {month}
        </Badge>
        <Spacer y={1} />
        <Text h1 style={{ lineHeight: 1.125 }}>
          {name}
        </Text>
        <Link
          block
          icon
          href={url}
          style={{ color: 'inherit', opacity: 0.625, marginLeft: '-5pt' }}
        >
          {url}
        </Link>
      </aside>
      <article dangerouslySetInnerHTML={{ __html: desc }} />
    </header>
    <Spacer y={2} />
    <GeistImage.Browser
      invert={color.includes('#f')}
      url={url}
      style={{ width: '100%', maxWidth: 1280 }}
    >
      {/* <Image src={`/projects/${slug}.png`} width={2732} height={2048} alt={`Screenshot of ${name}`} /> */}
      <iframe
        src={embedUrl || url}
        key={embedUrl || url}
        style={{ width: '100%', height: '75vh' }}
        frameBorder={0}
        loading={standalone ? 'eager' : 'lazy'}
      />
    </GeistImage.Browser>
    <style jsx>{`
      header {
        display: grid !important;
        grid-template-columns: 2fr 3fr;
        grid-gap: 16pt;
        align-items: end;
        max-width: 980px;
        margin: auto;
      }
      article {
        max-width: 56ch;
        font-size: 1.125rem;
      }
      :global(article p) {
        margin: 0;
      }
      :global(article a) {
        text-decoration: underline;
        text-underline-position: under;
        text-decoration-thickness: 0.2em;
        text-decoration-color: rgba(255, 255, 255, 0.5);
        transition: text-shadow 0.125s ease-in-out;
        color: inherit;
      }
      :global(a):hover,
      :global(a):focus {
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.875);
        text-decoration-color: rgba(255, 255, 255, 0.75);
      }
    `}</style>
  </Col>
)

export default Project
