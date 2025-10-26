import type { INodeProperties } from 'n8n-workflow';
import { parseLinkHeader } from '../../shared/utils';

const showOnlyForIssuedTickets = {
  resource: ['issuedTicket'],
};

export const issuedTicketDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForIssuedTickets,
    },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many issued tickets',
        description: 'Get many issued tickets',
        routing: {
          request: {
            method: 'GET',
            url: '=/issued_tickets',
          },
        },
      },
      {
        name: 'Get',
        value: 'get',
        action: 'Get an issued ticket',
        description: 'Get a single issued ticket',
        routing: {
          request: {
            method: 'GET',
            url: '=/issued_tickets/{{$parameter.issuedTicketId}}',
          },
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Issued Ticket ID',
    name: 'issuedTicketId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        ...showOnlyForIssuedTickets,
        operation: ['get'],
      },
    },
    routing: {
      request: {
        url: '=/issued_tickets/{{$value}}',
      },
    },
    description: 'The ID of the issued ticket to retrieve',
  },
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForIssuedTickets,
        operation: ['getAll'],
      },
    },
    description: 'If set, only issued tickets for this event will be returned',
    routing: {
      request: {
        qs: {
          event_id: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        ...showOnlyForIssuedTickets,
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 50,
    routing: {
      send: {
        type: 'query',
        property: 'per_page',
      },
      output: {
        maxResults: '={{$value}}',
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        ...showOnlyForIssuedTickets,
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
    routing: {
      send: {
        paginate: '={{ $value }}',
        type: 'query',
        property: 'per_page',
        value: '100',
      },
      operations: {
        pagination: {
          type: 'generic',
          properties: {
            continue: `={{ !!(${parseLinkHeader.toString()})($response.headers?.link).next }}`,
            request: {
              url: `={{ (${parseLinkHeader.toString()})($response.headers?.link)?.next ?? $request.url }}`,
            },
          },
        },
      },
    },
  },
];
