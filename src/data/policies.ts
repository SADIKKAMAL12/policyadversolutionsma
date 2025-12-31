import { PolicyTab } from '../types';

export const policyTabs: PolicyTab[] = [
  {
    id: 'agency-accounts',
    label: 'Agency Accounts',
    title: 'Agency Accounts Policy',
    sections: [
      {
        heading: 'SERVICE DESCRIPTION',
        content:
          'We do not deliver login credentials. Client provides their own account access. We activate their ad account, open spending, increase limits, assign access, or provide agency-level support.',
      },
      {
        heading: 'SERVICE COMPLETION',
        content:
          'The service is considered delivered once access is successfully assigned or account is activated.',
      },
      {
        heading: 'POLICY VIOLATION CASES',
        content: [
          'If the client runs ads that violate platform rules and account gets restricted:',
          '',
          'For Facebook & Google:',
          '– We either replace the access',
          '– or Refund the remaining balance minus a 6% processing fee.',
          '',
          'For TikTok Agency:',
          '– We provide Adversolutions chrome extension',
          '– Client is fully responsible for their balance',
          '– No balance transfer or refund applies',
        ],
      },
      {
        heading: 'WARRANTY',
        content:
          'Warranty remains valid as long as client uses account properly and without policy violations.',
      },
    ],
  },
  {
    id: 'verified-accounts',
    label: 'Verified Accounts',
    title: 'Verified Accounts Policy',
    sections: [
      {
        heading: 'WHAT IS DELIVERED',
        content: [
          'A zip folder containing:',
          '',
          '• login.txt (email – password – 2FA – recovery email)',
          '• cookies.txt',
          '',
          'Account is transferred inside client\'s AdsPower workspace.',
        ],
      },
      {
        heading: 'SERVICE COMPLETION',
        content: 'Service is considered completed after first successful login.',
      },
      {
        heading: 'WARRANTY RULES',
        content: [
          '• If login does not work on first attempt → replace immediately.',
          '',
          '• If account gets banned due to policy violation, fake documents, wrong business info, illegal ads, or changes made by client → warranty becomes void.',
          '',
          '• If account gets randomly suspended and not due to client misuse → replacement is provided.',
        ],
      },
      {
        heading: 'VERIFICATION HANDLING',
        content:
          'If platform requests verification: We handle the verification as long as the client does not attempt any verification themselves or use external service.',
      },
    ],
  },
  {
    id: 'verification-service',
    label: 'Verification Service',
    title: 'Verification Service Policy',
    sections: [
      {
        heading: 'WHAT WE DO',
        content: [
          'We perform verification on behalf of client, including:',
          '',
          '• KYC verification',
          '• ID document submission',
          '• Video selfie',
          '• Business verification',
          '• Document uploading',
          '',
          'Success rate varies between 70% and 90% depending on platform.',
        ],
      },
      {
        heading: 'REFUND GUARANTEE',
        content: 'If verification fails using valid documents → client receives 100% refund.',
      },
      {
        heading: 'NO REFUND IF',
        content: [
          '• Client submits fake documents',
          '• Uses invalid identity',
          '• Sends modified papers',
          '• Submits documents externally',
        ],
      },
      {
        heading: 'REVIEW TIME',
        content:
          'Verification can take 24h–7 days depending on platform decision.',
      },
    ],
  },
  {
    id: 'other-services',
    label: 'Other Services',
    title: 'Other Services Policy',
    sections: [
      {
        heading: 'SERVICES INCLUDED',
        content: [
          'This includes:',
          '',
          '• Facebook scripts/tools',
          '• Cloaking service',
          '• Verified bank accounts',
          '• Payment gateways',
          '• WhatsApp API',
          '• Temporary accounts',
          '• Miscellaneous services',
        ],
      },
      {
        heading: 'SERVICE COMPLETION',
        content:
          'Once access, files, credentials, or activation is delivered, service is completed.',
      },
      {
        heading: 'NO REFUND',
        content: 'After delivery, refunds are not applicable.',
      },
      {
        heading: 'REPLACEMENT ONLY IF',
        content: [
          '• Access provided is wrong',
          '• File is corrupted',
          '• Service was not delivered properly',
          '• Service was not delivered properly',
        ],
      },
      {
        heading: 'CLIENT RESPONSIBILITY',
        content:
          'Any ban, closure, policy restriction, or compliance failure caused by user usage is not covered by us.',
      },
    ],
  },
];
