import {
	IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class TicketTailorApi implements ICredentialType {
  name = 'ticketTailorApi';
  displayName = 'Ticket Tailor API';
  documentationUrl = 'https://developers.tickettailor.com/';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
						typeOptions: { password: true },
      default: '',
    },
  ];

		// This credential is currently not used by any node directly
	// but the HTTP Request node can use it to make requests.
	// The credential is also testable due to the `test` property below
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
    properties: {
      headers: {
        Authorization: '={{ "Token " + $credentials.apiKey }}',
      },
    },
  };

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
      method: 'GET',
      url: 'https://api.tickettailor.com/v1/events',
    },
  };
}
