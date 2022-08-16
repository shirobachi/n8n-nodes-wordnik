import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WordnikApi implements ICredentialType {
	name = 'wordnikApi';
	displayName = 'Wordnik API';
	documentationUrl = 'https://developer.wordnik.com/docs';
	properties: INodeProperties[] = [
			{
					displayName: 'API Key',
					name: 'apiKey',
					type: 'string',
					default: '',
			},
	];
}
