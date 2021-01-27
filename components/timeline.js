import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import Link from 'next/link'
import Image from 'next/image'
import { Col, Row, Text } from '@geist-ui/react'
import projects from '../data.json'

const Timeline = () => {
  const router = useRouter()
  const amp = useAmp()

  return (
    <Row
      component="nav"
      gap={1}
      className="timeline"
      style={{ paddingTop: '12pt', margin: 0, overflowX: 'auto' }}
    >
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
            {!amp && (
              <Image
                src={`/sites/${project.slug}.png`}
                width={2732 / 12}
                height={2048 / 12}
                alt={`Screenshot of ${project.slug.replace(/-/g, ' ')}`}
                quality={32}
              />
            )}
            <Text b={project.slug === router.query.slug} small>
              {project.month}
            </Text>
          </Col>
        </Link>
      ))}
      <style jsx global>{`
        .timeline a {
          color: inherit;
          min-width: 72px;
          max-width: 128px;
          text-align: center;
          line-height: 1.25;
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
