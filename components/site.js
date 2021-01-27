import {
  Text,
  Row,
  Spacer,
  Link,
  Badge,
  Image as GeistImage,
  Col
} from '@geist-ui/react'
import NextLink from 'next/link'
import { GitHub, Grid, ArrowNext, ArrowPrev } from './icons'
import Author from '../components/author'

const Nav = ({ prevSlug, nextSlug, ...props }) => (
  <Row component="nav" {...props}>
    {prevSlug && (
      <NextLink href={`/${prevSlug}`}>
        <Link block title="View previous site">
          <ArrowPrev />
          <Spacer x={0.25} />
          Prev
        </Link>
      </NextLink>
    )}
    {prevSlug && nextSlug && <Spacer x={0.75} />}
    {nextSlug && (
      <NextLink href={`/${nextSlug}`}>
        <Link block title="View next site">
          Next
          <Spacer x={0.25} />
          <ArrowNext />
        </Link>
      </NextLink>
    )}
  </Row>
)

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
  prevSlug,
  nextSlug,
  ...props
}) => (
  <Col
    id={slug}
    gap={2}
    className="project"
    style={{
      backgroundColor: color,
      color: color.includes('#f') ? '#222' : '#fff',
      margin: 0,
      padding: `${standalone ? 24 : 12}pt 12pt`
    }}
    {...props}
  >
    <header className="project-header">
      <Row component="header">
        <NextLink href="/">
          <Link block title="View all sites">
            <Grid />
          </Link>
        </NextLink>
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
        <Spacer y={2} style={{ flex: '1 1 auto' }} />
        <Nav prevSlug={prevSlug} nextSlug={nextSlug} />
      </Row>
      <aside>
        <Spacer y={0.75} />
        <Text h1>{name}</Text>
        <Row component="footer">
          <Link block icon href={url}>
            {url.replace('https://', '')}
          </Link>
          {github && (
            <Link block href={github} style={{ alignItems: 'center' }}>
              <GitHub width={16} height={16} style={{ marginRight: '6pt' }} />
              Source code
            </Link>
          )}
        </Row>
      </aside>
      <article dangerouslySetInnerHTML={{ __html: desc }} />
    </header>
    <Spacer y={2} />
    <GeistImage.Browser
      invert={color.includes('#f')}
      url={url}
      style={{ width: 1280, maxWidth: '100%' }}
    >
      <iframe
        src={embedUrl || url}
        key={embedUrl || url}
        style={{ width: '100%', height: standalone ? '87.5vh' : '75vh' }}
        frameBorder={0}
        loading={standalone ? 'eager' : 'lazy'}
      />
    </GeistImage.Browser>
    <Spacer y={2} />
    {standalone && (
      <>
        <Nav prevSlug={prevSlug} nextSlug={nextSlug} justify="center" />
        <Spacer y={1} />
        <Row component="footer" align="center" justify="center">
          <Author github />
        </Row>
        <Spacer y={1} />
      </>
    )}
    <style jsx global>{`
      @media (min-width: 32em) {
        .project-header {
          grid-template-columns: 2fr 3fr;
          align-items: end;
          max-width: 768pt;
          margin: auto;
        }
        .project-header header {
          grid-column: span 2;
        }
      }
      .project-header {
        display: grid !important;
        grid-gap: 16pt;
      }
      .project nav a {
        color: inherit !important;
        align-items: center !important;
        text-transform: uppercase;
      }
      @media (max-width: 32em) {
        .project-header nav span {
          display: none;
        }
      }
      .project-header header,
      .project-header footer {
        align-items: center !important;
        margin-left: -6pt !important;
        flex-wrap: wrap;
      }
      .project-header header a:first-child {
        line-height: 0;
        margin-right: 12pt;
      }
      .project-header footer a {
        margin-right: 8pt;
      }
      .project-header header a,
      .project-header footer a {
        opacity: 0.75;
        color: inherit !important;
      }
      .project-header h1 {
        line-height: 1.125;
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
      .names a,
      .names a:hover,
      .names span {
        color: inherit !important;
      }
    `}</style>
  </Col>
)

export default Project
