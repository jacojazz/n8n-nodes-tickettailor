# n8n-nodes-tickettailor

This is an n8n community node. It lets you use TicketTailor in your n8n workflows.

TicketTailor is an online ticketing platform that helps you sell tickets and manage registrations for your events. This node enables you to access event data and issued tickets through TicketTailor's API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Events
- **Get** - Get a single event by ID
- **Get Many** - Get a list of events with optional pagination

### Issued Tickets
- **Get** - Get a single issued ticket by ID
- **Get Many** - Get a list of issued tickets with optional filtering by event ID and pagination

## Credentials

You need to authenticate with TicketTailor using an API key.

1. Log in to your TicketTailor account
2. Go to Settings > API & Webhooks
3. Generate a new API key
4. Use this API key in n8n credentials

The node will automatically encode the API key and send it in the correct format:
`Authorization: Basic Base64Encode(api_key)`

## Compatibility

Requires n8n version 1.0.0 or later.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [TicketTailor API Documentation](https://developers.tickettailor.com/docs/api/ticket-tailor-api)
* [TicketTailor Website](https://www.tickettailor.com/)