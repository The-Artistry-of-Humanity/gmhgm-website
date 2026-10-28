import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  location?: string
  reason?: string
  packageInterest?: string
  weeklyTime?: string
  notes?: string
}

const NotificationEmail = ({
  name, email, location, reason, packageInterest, weeklyTime, notes,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New coaching enquiry from {name || 'a prospect'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New coaching enquiry</Heading>
        <Text style={text}>You've received a new enquiry through gmhgm.com.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email}</Text>
          <Text style={label}>Location</Text>
          <Text style={value}>{location}</Text>
          <Text style={label}>Package interest</Text>
          <Text style={value}>{packageInterest}</Text>
          <Text style={label}>Weekly time available</Text>
          <Text style={value}>{weeklyTime}</Text>
          <Text style={label}>Why they're reaching out</Text>
          <Text style={value}>{reason}</Text>
          {notes ? (
            <>
              <Text style={label}>Additional notes</Text>
              <Text style={value}>{notes}</Text>
            </>
          ) : null}
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NotificationEmail,
  subject: (d: Record<string, any>) => `New coaching enquiry — ${d.name || 'prospect'}`,
  displayName: 'Coaching enquiry — internal notification',
  previewData: {
    name: 'John Doe',
    email: 'john@example.com',
    location: 'London, UK',
    reason: 'Looking to reconnect with purpose after a tough year.',
    packageInterest: '12-week immersion',
    weeklyTime: '2-3 hours',
    notes: 'Prefer evening calls.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0A0A0A', margin: '0 0 12px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 12px' }
const hr = { borderColor: '#e5e7eb', margin: '20px 0' }
const label = { fontSize: '12px', color: '#0000EE', fontWeight: 'bold', textTransform: 'uppercase' as const, margin: '12px 0 4px', letterSpacing: '0.5px' }
const value = { fontSize: '14px', color: '#0A0A0A', margin: '0 0 8px', lineHeight: '1.5', whiteSpace: 'pre-wrap' as const }