import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class TicketTailor implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ticket Tailor',
		name: 'ticketTailor',
		icon: 'file:ticketTailor.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Interact with Ticket Tailor API',
		defaults: {
			name: 'Ticket Tailor',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'ticketTailorApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://https://api.tickettailor.com/v1/',
			url: '',
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
						value: 'events',
					},
					{
						name: 'Issued Ticket',
						value: 'issued_tickets',
					},
				],
				default: 'events',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['events'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						action: 'List all events',
						description: 'Returns a list of events belonging to the box office',
						routing: {
							request: {
								method: 'GET',
								url: '/events',
							},
						},
					},
				],
				default: 'list',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['issued_tickets'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						action: 'List issued tickets',
						description: 'Returns all issued tickets',
						routing: {
							request: {
								method: 'GET',
								url: '/issued_tickets',
							},
						},
					},
				],
				default: 'list',
			},
			{
				displayName: 'Event ID',
				description: 'Choose which event to get tickets for',
				name: 'event',
				type: 'string',
				routing: {
					request: {
						// You've already set up the URL. qs appends the value of the field as a query string
						qs: {
							event_id: '{{$value}}',
						},
					},
				},
				default: '',
				displayOptions: {
					show: {
						resource: ['issued_tickets'],
					},
				},
			},
		],
	};
}
