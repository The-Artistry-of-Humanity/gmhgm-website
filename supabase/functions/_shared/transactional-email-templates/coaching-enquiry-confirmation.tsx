import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
}

const ConfirmationEmail = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We've received your coaching enquiry</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Thanks, ${name}.` : 'Thanks for reaching out.'}
        </Heading>
        <Text style={text}>
          We've received your coaching enquiry. Ian will review it personally and
          get back to you within a few days to see if it's the right fit.
        </Text>
        <Text style={text}>
          In the meantime, take a breath. Showing up here is already a step.
        </Text>
        <Text style={signoff}>— The GMHGM Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ConfirmationEmail,
  subject: "We've received your coaching enquiry",
  displayName: 'Coaching enquiry — confirmation to prospect',
  previewData: { name: 'John' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#0A0A0A', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#3f3f46', lineHeight: '1.6', margin: '0 0 16px' }
const signoff = { fontSize: '14px', color: '#0000EE', margin: '24px 0 0', fontWeight: 'bold' as const }