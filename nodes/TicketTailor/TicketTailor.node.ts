import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { eventDescription } from './resources/event/index';
import { issuedTicketDescription } from './resources/issuedTicket/index';

export class TicketTailor implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'TicketTailor',
    name: 'ticketTailor',
    icon: { light: 'file:../../icons/github.svg', dark: 'file:../../icons/github.dark.svg' },
    group: ['input'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Consume the TicketTailor API',
    defaults: {
      name: 'TicketTailor',
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: 'ticketTailorApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.tickettailor.com/v1',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Event',
            value: 'event',
          },
          {
            name: 'Issued Ticket',
            value: 'issuedTicket',
          },
        ],
        default: 'event',
      },
      ...eventDescription,
      ...issuedTicketDescription,
    ],
  };
}
