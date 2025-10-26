import type { INodeProperties } from 'n8n-workflow';
import { parseLinkHeader } from '../../shared/utils';

const showOnlyForEvents = {
  resource: ['event'],
};

export const eventDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForEvents,
    },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many events',
        description: 'Get many events',
        routing: {
          request: {
            method: 'GET',
            url: '=/events',
          },
        },
      },
      {
        name: 'Get',
        value: 'get',
        action: 'Get an event',
        description: 'Get a single event',
        routing: {
          request: {
            method: 'GET',
            url: '=/events/{{$parameter.eventId}}',
          },
        },
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        ...showOnlyForEvents,
        operation: ['get'],
      },
    },
    routing: {
      request: {
        url: '=/events/{{$value}}',
      },
    },
    description: 'The ID of the event to retrieve',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        ...showOnlyForEvents,
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
        ...showOnlyForEvents,
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

export const eventGetDescription: INodeProperties[] = [
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        ...showOnlyForEvents,
        operation: ['get'],
      },
    },
  },
];
