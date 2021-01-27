import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Col, Row, Text } from '@geist-ui/react'
import projects from '../data.json'

const Timeline = () => {
  const router = useRouter()

  return (
    <Row component="nav" gap={1} className="timeline">
      {projects.map(project => (
        <Link
          key={project.slug}
          passHref
          href={`/${project.slug}`}
          prefetch={false}
        >
          <Col
            component="a"
            className={project.slug === router.query.slug ? 'active' : ''}
          >
            <Image
              src={`/sites/${project.slug}.png`}
              width={2732 / 12}
              height={2048 / 12}
              alt={`Screenshot of ${project.slug.replace(/-/g, ' ')}`}
              quality={32}
            />
            <Text b={project.slug === router.query.slug} small>
              {project.month}
            </Text>
          </Col>
        </Link>
      ))}
      <style jsx global>{`
        .timeline {
          padding-top: 12pt;
          margin: 0 !important;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
        }
        .timeline a {
          color: inherit;
          min-width: 72px;
          max-width: 128px;
          text-align: center;
          line-height: 1.25;
          scroll-snap-align: start;
        }
        .timeline a.active {
          filter: drop-shadow(0 0 5px white);
        }
        .timeline a:focus > div,
        .timeline a:hover > div {
          transform: scale(1.25);
        }
        .timeline a > div {
          transition: transform 0.125s ease-in-out;
          transform-origin: center top;
          will-change: transform;
        }
        .timeline a img {
          border-radius: 5px;
        }
      `}</style>
    </Row>
  )
}

export default Timeline
