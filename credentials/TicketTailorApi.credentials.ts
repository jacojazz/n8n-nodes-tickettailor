import type {
    IAuthenticateGeneric,
    Icon,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class TicketTailorApi implements ICredentialType {
    name = 'ticketTailorApi';

    displayName = 'TicketTailor API';

    icon: Icon = { light: 'file:../icons/github.svg', dark: 'file:../icons/github.dark.svg' };

    documentationUrl = 'https://developers.tickettailor.com/docs/api/ticket-tailor-api';

    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            description: 'Your TicketTailor API key.',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: "={{ `Basic ${Buffer.from($credentials.apiKey || '').toString('base64')}` }}",
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.tickettailor.com/v1',
            url: '/events',
            method: 'GET',
        },
    };
}
