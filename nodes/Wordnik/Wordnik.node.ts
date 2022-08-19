/* eslint-disable n8n-nodes-base/node-param-default-wrong-for-options */
import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { type } from 'os';

import {
	OptionsWithUri,
} from 'request';

const nodeOperations: INodePropertyOptions[] = [
	{
		name: 'Noun',
		value: 'noun',
	},
	{
		name: 'Adjective',
		value: 'adjective',
	},
	{
		name: 'Verb',
		value: 'verb',
	},
	{
		name: 'Adverb',
		value: 'adverb',
	},
	{
		name: 'Interjection',
		value: 'interjection',
	},
	{
		name: 'Pronoun',
		value: 'pronoun',
	},
	{
		name: 'Preposition',
		value: 'preposition',
	},
	{
		name: 'Abbreviation',
		value: 'abbreviation',
	},
	{
		name: 'Affix',
		value: 'affix',
	},
	{
		name: 'Article',
		value: 'article',
	},
	{
		name: 'Auxiliary Verb',
		value: 'auxiliary-verb',
	},
	{
		name: 'Conjunction',
		value: 'conjunction',
	},
	{
		name: 'Definite Article',
		value: 'definite-article',
	},
	{
		name: 'Family Name',
		value: 'family-name',
	},
	{
		name: 'Given Name',
		value: 'given-name',
	},
	{
		name: 'Idiom',
		value: 'idiom',
	},
	{
		name: 'Imperative',
		value: 'imperative',
	},
	{
		name: 'Noun Plural',
		value: 'noun-plural',
	},
	{
		name: 'Noun Possessive',
		value: 'noun-posessive',
	},
	{
		name: 'Past Participle',
		value: 'past-participle',
	},
	{
		name: 'Phrasal Prefix',
		value: 'phrasal-prefix',
	},
	{
		name: 'Proper Noun',
		value: 'proper-noun',
	},
	{
		name: 'Proper Noun Plural',
		value: 'proper-noun-plural',
	},
	{
		name: 'Proper Noun Possessive',
		value: 'proper-noun-posessive',
	},
	{
		name: 'Suffix',
		value: 'suffix',
	},
	{
		name: 'Verb Intransitive',
		value: 'verb-intransitive',
	},
	{
		name: 'Verb Transitive',
		value: 'verb-transitive',
	},
];export class Wordnik implements INodeType {

	description: INodeTypeDescription = {
			displayName: 'Wordnik',
			name: 'wordnik',
			// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
			icon: 'file:Wordnik.png',
			group: ['transform'],
			version: 1,
			description: 'API for fetching words',
			defaults: {
					name: 'Wordnik',
					color: '#f7921f',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'wordnikApi',
					required: true,
				},

			],
			properties: [
					// Node properties which the user gets displayed and
					// can change on the node.
					{
						displayName: 'Resource',
						name: 'resource',
						type: 'options',
						noDataExpression: true,
						options: [
							{
								name: 'Word',
								value: 'word',
								description: 'Retrieve a information about specific word',
							},
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
								name: 'Words',
								value: 'words',
								description: 'Retrieve a information about specific word',
							},
						],
						default: 'word',
						required: true,
					},

					{
						// word: audio, definitions, etymologies, examples, frequency, hyphenation, phrases, pronunciations, relatedWords, scrabbleScore, topExample
						displayName: 'Operation',
						name: 'operation',
						type: 'options',
						noDataExpression: true,
						displayOptions: {
							show: {
								resource: [
									'word',
								],
							},
						},
						options: [
							{
								name: 'Audio',
								value: 'audio',
								description: 'Retrieve pronunciation of a word',
								action: 'Audio a word',
							},
							{
								name: 'Definitions',
								value: 'definitions',
								description: 'Retrieve a list of definitions of a word',
								action: 'Definitions a word',
							},
							{
								name: 'Etymologies',
								value: 'etymologies',
								description: 'Retrieve a list of etymologies of a word',
								action: 'Etymologies a word',
							},
							{
								name: 'Examples',
								value: 'examples',
								description: 'Retrieve a list of examples of a word',
								action: 'Examples a word',
							},
							{
								name: 'Frequency',
								value: 'frequency',
								description: 'Retrieve frequency of a word',
								action: 'Frequency a word',
							},
							{
								name: 'Hyphenation',
								value: 'hyphenation',
								description: 'Retrieve a list of hyphenation of a word',
								action: 'Hyphenation a word',
							},
							{
								name: 'Phrases',
								value: 'phrases',
								description: 'Retrieve a list of phrases of a word',
								action: 'Phrases a word',
							},
							{
								name: 'Pronunciations',
								value: 'pronunciations',
								description: 'Retrieve a list of pronunciations (in academical format, not audio) of a word',
								action: 'Pronunciations a word',
							},
							{
								name: 'RelatedWords',
								value: 'relatedWords',
								description: 'Retrieve a list of related words of a word',
								action: 'Related words a word',
							},
							{
								name: 'ScrabbleScore',
								value: 'scrabbleScore',
								description: 'Retrieve scrabble score of a word',
								action: 'Scrabble score a word',
							},
							{
								name: 'TopExample',
								value: 'topExample',
								description: 'Retrieve a top example of a word',
								action: 'Top example a word',
							},
						],
						default: 'definitions',
					},
					{
						// words: randomWord, randomWords, reverseDictionary, search, wordOfTheDay
						displayName: 'Operation',
						name: 'operation',
						type: 'options',
						noDataExpression: true,
						displayOptions: {
							show: {
								resource: [
									'words',
								],
							},
						},
						options: [
							{
								name: 'RandomWord',
								value: 'randomWord',
								description: 'Retrieve a random word',
								action: 'Random word a words',
							},
							{
								name: 'RandomWords',
								value: 'randomWords',
								description: 'Retrieve a list of random words',
								action: 'Random words a words',
							},
							// in v4 this is not available anymore
							// {
							// 	name: "ReverseDictionary",
							// 	value: "reverseDictionary",
							// },
							// in v4 this is not available anymore
							// {
							// 	name: "Search",
							// 	value: "search",
							// },
							{
								name: 'WordOfTheDay',
								value: 'wordOfTheDay',
								description: 'Retrieve a word of the day',
								action: 'Word of the day a words',
							},
						],
						default: 'randomWord',
					},
					{
						displayName: 'Word',
						name: 'theWord',
						type: 'string',
						required: true,
						displayOptions: {
							show: {
								resource: [
									'word',
								],
							},
						},
						default: '',
						placeholder:'bed',
						description: 'The word use in query',
					},
					{
						displayName: 'Use Canonical',
						name: 'useCanonical',
						type: 'boolean',
						required: true,
						displayOptions: {
							show: {
								resource: [
									'word',
								],
								operation: [
									'audio',
									'definitions',
									'etymologies',
									'examples',
									'frequency',
									'hyphenation',
									'phrases',
									'pronunciations',
									'relatedWords',
									'topExample',
								],
							},
						},
						default: false,
						description:'Whether should return root word (cats => cat)',
					},
					{
						displayName: 'Get All',
						name: 'getAll',
						type: 'boolean',
						displayOptions: {
							show: {
								operation: [
									'audio',
									'definitions',
									'examples',
									'hyphenation',
									'phrases',
									'pronunciations',
									'randomWords',
								],
							},
						},
						default: true,
						description: 'Whether should return all results',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						required: true,
						displayOptions: {
							show: {
								getAll: [
									false,
								],
								operation: [
									'audio',
									'definitions',
									'examples',
									'hyphenation',
									'phrases',
									'pronunciations',
									'randomWords',
								],
							},
						},
						default: 50,
						description: 'Max number of results to return',
					},

					{
						displayName: 'Additional Fields',
						name: 'additionalFields',
						type: 'collection',
						placeholder: 'Add field',
						default: {},
						options: [
							{
								displayName: 'Part of Speech',
								name: 'partOfSpeech',
								type: 'multiOptions',
								required: true,
								default: [],
								description: 'CSV list of part-of-speech types',
								options: nodeOperations,
								displayOptions: {
									show: {
										'/operation': [
											'definitions',
										],
									},
								},
							},
							{
								displayName: 'Include Related',
								name: 'includeRelated',
								type: 'boolean',
								default: false,
								description: 'Whether should return related words with definitions',
								displayOptions: {
									show: {
										'/operation': [
											'definitions',
										],
									},
								},
							},
							{
								displayName: 'Source Dictionaries',
								name: 'sourceDictionaries',
								type: 'multiOptions',
								default: [],
								required: true,
								description: 'Return a closed set of XML tags in response',
								options: [
									{
										'name': 'Ahd5',
										'value': 'ahd-5',
									},
									{
										'name': 'Ahd legacy',
										'value': 'ahd-legacy',
									},
									{
										'name': 'Century',
										'value': 'century',
									},
									{
										'name': 'Wiktionary',
										'value': 'wiktionary',
									},
									{
										'name': 'Webster',
										'value': 'webster',
									},
									{
										'name': 'Wordnet',
										'value': 'wordnet',
									},
								],
								displayOptions: {
									show: {
										'/operation': [
											'definitions',
											'hyphenation',
											'pronunciations',
										],
									},
								},
							},
							{
								displayName: 'Include Tags',
								name: 'includeTags',
								type: 'boolean',
								default: false,
								description: 'Whether should return a closed set of XML tags in response',
								displayOptions: {
									show: {
										'/operation': [
											'definitions',
										],
									},
								},
							},
							{
								displayName: 'Include Duplicates',
								name: 'includeDuplicates',
								type: 'boolean',
								default: false,
								description: 'Whether should return duplicate examples from different sources',
								displayOptions: {
									show: {
										'/operation': [
											'examples',
										],
									},
								},
							},
							{
								displayName: 'Skip',
								name: 'skip',
								type: 'number',
								default: 1,
								description: 'Results to skip',
								typeOptions: {
									minValue: 1,
									maxValue: 50,
								},
								displayOptions: {
									show: {
										'/operation': [
											'examples',
										],
									},
								},
							},
							{
								displayName: 'Start Year',
								name: 'startYear',
								type: 'number',
								default: 1,
								description: 'Starting Year',
								typeOptions: {
									minValue: 1800,
								},
								displayOptions: {
									show: {
										'/operation': [
											'frequency',
										],
									},
								},
							},
							{
								displayName: 'End Year',
								name: 'endYear',
								type: 'number',
								default: 1,
								description: 'Ending Year',
								typeOptions: {
									minValue: 1800,
								},
								displayOptions: {
									show: {
										'/operation': [
											'frequency',
										],
									},
								},
							},
							{
								displayName: 'Wlmi',
								name: 'wlmi',
								type: 'number',
								default: '',
								description: 'Minimum WLMI (wordlist minimum information) for the phrase',
								typeOptions: {
									minValue: 0,
									maxValue: 50,
								},
								displayOptions: {
									show: {
										'/operation': [
											'phrases',
										],
									},
								},
							},
							{
								displayName: 'Type Format',
								name: 'typeFormat',
								type: 'options',
								default: '',
								description: 'Text pronunciation type',
								options: [
									{
										'name': 'Ahd 5',
										'value': 'ahd-5',
									},
									{
										'name': 'Arpabet',
										'value': 'arpabet',
									},
									{
										'name': 'Gcide diacritical',
										'value': 'gcide-diacritical',
									},
									{
										'name': 'IPA',
										'value': 'IPA',
									},
								],
								displayOptions: {
									show: {
										'/operation': [
											'pronunciations',
										],
									},
								},
							},
							{
								displayName: 'Relationship Types',
								name: 'relationshipTypes',
								type: 'options',
								default: '',
								description: 'Limits the total results per type of relationship type',
								options: [
									{
										'name': 'Synonym',
										'value': 'synonym',
									},
									{
										'name': 'Antonym',
										'value': 'antonym',
									},
									{
										'name': 'Variant',
										'value': 'variant',
									},
									{
										'name': 'Equivalent',
										'value': 'equivalent',
									},
									{
										'name': 'Cross reference',
										'value': 'cross-reference',
									},
									{
										'name': 'Related word',
										'value': 'related-word',
									},
									{
										'name': 'Rhyme',
										'value': 'rhyme',
									},
									{
										'name': 'Form',
										'value': 'form',
									},
									{
										'name': 'Etymologically related term',
										'value': 'etymologically-related-term',
									},
									{
										'name': 'Hypernym',
										'value': 'hypernym',
									},
									{
										'name': 'Hyponym',
										'value': 'hyponym',
									},
									{
										'name': 'Inflected form',
										'value': 'inflected-form',
									},
									{
										'name': 'Primary',
										'value': 'primary',
									},
									{
										'name': 'Same context',
										'value': 'same-context',
									},
									{
										'name': 'Verb form',
										'value': 'verb-form',
									},
									{
										'name': 'Verb stem',
										'value': 'verb-stem',
									},
									{
										'name': 'Has_topic',
										'value': 'has_topic',
									},
								],
								displayOptions: {
									show: {
										'/operation': [
											'relatedWords',
										],
									},
								},
							},
							{
								displayName: 'Limit per Relationship Type',
								name: 'limitPerRelationshipType',
								type: 'number',
								default: 10,
								description: 'Restrict to the supplied relationship types',
								typeOptions: {
									minValue: 0,
									maxValue: 1000,
								},
								displayOptions: {
									show: {
										'/operation': [
											'relatedWords',
										],
									},
								},
							},
							{
								displayName: 'Has Dictionary Definition',
								name: 'hasDictionaryDef',
								type: 'boolean',
								default: true,
								description: 'Whether should return only words with dictionary definitions',
								displayOptions: {
									show: {
										'/operation': [
											'randomWord',
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Include Part of Speech',
								name: 'includePartOfSpeech',
								required: true,
								type: 'multiOptions',
								default: [],
								description: 'Include parts of speech to result',
								options: nodeOperations,
								displayOptions: {
									show: {
										'/operation': [
											'randomWord',
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Exclude Part of Speech',
								name: 'excludePartOfSpeech',
								required: true,
								type: 'multiOptions',
								default: [],
								description: 'Exclude parts of speech to result',
								options: nodeOperations,
								displayOptions: {
									show: {
										'/operation': [
											'randomWord',
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Min Corpus Count',
								name: 'minCorpusCount',
								type: 'number',
								default: 100,
								// desc is accorded to https://stackoverflow.com/a/11597950/8846153
								description: 'The corpus frequency is the measure of how many times a (case-sensitive) word has been found, and is based on the millions of documents consumed by Wordnik. You can use this measure to determine the \'commonality\' of a word.',
								typeOptions: {
									minValue: 0,
								},
								displayOptions: {
									show: {
										'/operation': [
											'randomWord',
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Max Corpus Count',
								name: 'maxCorpusCount',
								type: 'number',
								default: 1000,
								// desc is accorded to https://stackoverflow.com/a/11597950/8846153
								description: 'The corpus frequency is the measure of how many times a (case-sensitive) word has been found, and is based on the millions of documents consumed by Wordnik. You can use this measure to determine the \'commonality\' of a word.',
								typeOptions: {
									minValue: 0,
								},
								displayOptions: {
									show: {
										'/operation': [
											'randomWord',
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Min Dictionary Count',
								name: 'minDictionaryCount',
								type: 'number',
								default: 1,
								typeOptions: {
									minValue: 1,
								},
								description: 'Minimum dictionary count',
								displayOptions: {
									show: {
										'/operation': [
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Max Dictionary Count',
								name: 'maxDictionaryCount',
								type: 'number',
								default: 10,
								typeOptions: {
									minValue: -1,
								},
								description: 'Minimum dictionary count',
								displayOptions: {
									show: {
										'/operation': [
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Min Length',
								name: 'minLength',
								type: 'number',
								default: 1,
								typeOptions: {
									minValue: 0,
								},
								description: 'Minimum word length',
								displayOptions: {
									show: {
										'/operation': [
											'randomWord',
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Max Length',
								name: 'maxLength',
								type: 'number',
								default: 10,
								typeOptions: {
									minValue: -1,
								},
								description: 'Maximum word length',
								displayOptions: {
									show: {
										'/operation': [
											'randomWord',
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Sort By',
								name: 'sortBy',
								type: 'options',
								default: '',
								options: [
									{
										'name': 'Alphabetical',
										'value': 'alpha',
									},
									{
										'name': 'Quantity',
										'value': 'count',
									},
								],
								description: 'Attribute to sort by',
								displayOptions: {
									show: {
										'/operation': [
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Sort Order',
								name: 'sortOrder',
								type: 'options',
								default: '',
								options: [
									{
										'name': 'Ascending',
										'value': 'asc',
									},
									{
										'name': 'Descending',
										'value': 'desc',
									},
								],
								description: 'Sort direction',
								displayOptions: {
									show: {
										'/operation': [
											'randomWords',
										],
									},
								},
							},
							{
								displayName: 'Date',
								name: 'date',
								type: 'dateTime',
								default: '',
								description: 'Fetches by date',
								displayOptions: {
									show: {
										'/operation': [
											'wordOfTheDay',
										],
									},
								},
							},

						],
					},
			],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		//Get credentials the user provided for this node
		const credentials = await this.getCredentials('wordnikApi') as IDataObject;

		let qs: IDataObject;
		qs = {
			api_key: credentials.apiKey,
		};

		try {
			qs.useCanonical = this.getNodeParameter('useCanonical', 0) as string;
			if (!this.getNodeParameter('getAll', 0)){
				qs.limit = this.getNodeParameter('limit', 0) as number;
			}
		} catch (error) {
			// nothing bad happens, just for this route useCanonical or limit are not a field.
		}

		const props =  this.getNodeParameter('additionalFields', 0) as object;
		for(const prop in props){
			if(props.hasOwnProperty(prop)){
				qs[prop] = props[prop as keyof typeof props] as string[];
				qs[prop] = qs[prop]?.toString();

			}
		}

		const items = this.getInputData();
		const returnData = [];

		// go through all items
		for (let i = 0; i < items.length; i++) {
			// endpoint is like below,
			// https://api.wordnik.com/v4/word.json/{word}/definitions?limit=1 ...
			// https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true ...
			// so word will can be 'bed/' or ''
			let word = '';
			if(resource === 'word') {
				word = this.getNodeParameter('theWord', i) as string + '/';
			}

			const options: OptionsWithUri = {
				method: 'GET',
				qs,
				uri: `https://api.wordnik.com/v4/${resource}.json/${word}${operation}`,
				json: true,
			};

			// response will be array so let's push item by item
			responseData = await this.helpers.request(options);
			if(responseData instanceof Array){
				for(const item of responseData){
					returnData.push(item);
				}
			}
			else{
				returnData.push(responseData);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
