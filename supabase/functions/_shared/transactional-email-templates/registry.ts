/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as coachingEnquiryNotification } from './coaching-enquiry-notification.tsx'
import { template as coachingEnquiryConfirmation } from './coaching-enquiry-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'coaching-enquiry-notification': coachingEnquiryNotification,
  'coaching-enquiry-confirmation': coachingEnquiryConfirmation,
}