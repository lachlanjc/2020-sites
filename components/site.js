import {
  Text,
  Row,
  Spacer,
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
  github,
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
          padding: '24pt 0'
        }
        : {
          padding: '48pt 0',
          scrollSnapAlign: 'start'
        })
    }}
    {...props}
  >
    <header className="project-header">
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
        <Text h1>{name}</Text>
        <Link block icon href={url}>
          {url.replace('https://', '')}
        </Link>
        {github && (
          <Link block icon href={github}>
            GitHub
          </Link>
        )}
      </aside>
      <article dangerouslySetInnerHTML={{ __html: desc }} />
    </header>
    <Spacer y={2} />
    <GeistImage.Browser
      invert={color.includes('#f')}
      url={url}
      style={{ width: 'calc(100% + 32pt)', maxWidth: 1280 }}
    >
      {/* <Image src={`/projects/${slug}.png`} width={2732} height={2048} alt={`Screenshot of ${name}`} /> */}
      <iframe
        src={embedUrl || url}
        key={embedUrl || url}
        style={{ width: '100%', height: standalone ? '87.5vh' : '75vh' }}
        frameBorder={0}
        loading={standalone ? 'eager' : 'lazy'}
      />
    </GeistImage.Browser>
    <style jsx global>{`
      @media (min-width: 32em) {
        .project-header {
          display: grid !important;
          grid-template-columns: 2fr 3fr;
          grid-gap: 16pt;
          align-items: end;
          max-width: 768pt;
          margin: auto;
        }
      }
      .project-header {
        padding: 0 16pt;
      }
      .project-header h1 {
        line-height: 1.125;
      }
      .project-header h1 + a {
        margin-left: -5pt;
      }
      .project-header h1 ~ a {
        opacity: 0.75;
        color: inherit !important;
      }
      article {
        max-width: 56ch;
        font-size: 1.125rem;
      }
      article p {
        margin: 0;
      }
      article a {
        text-decoration: underline;
        text-underline-position: under;
        text-decoration-thickness: 0.2em;
        text-decoration-color: rgba(255, 255, 255, 0.5);
        transition: all 0.125s ease-in-out;
        color: inherit;
      }
      article a:hover,
      article a:focus {
        text-decoration: underline;
        text-decoration-thickness: 0.05em;
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.875);
        text-decoration-color: rgba(255, 255, 255, 0.75);
      }
      .bowser {
        perspective: 1px;
      }
    `}</style>
  </Col>
)

export default Project
