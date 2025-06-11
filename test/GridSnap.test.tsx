import { gridTests } from '@rjsf/snapshot-tests';
import Form from '../src';

gridTests(Form as Parameters<typeof gridTests>[0], {
  ColumnWidth4: { className: 'col-span-4' },
  ColumnWidth6: { className: 'col-span-6' },
  ColumnWidth8: { className: 'col-span-8' },
  ColumnWidthAll: { className: 'col-span-12' },
  ComplexUiSchema: {
    employment: {
      description: {
        'ui:widget': 'textarea',
      },
      'ui:options': {
        inline: true,
      },
    },
    person: {
      address: {
        'ui:field': 'LayoutGridField',
        'ui:layoutGrid': {
          'ui:row': {
            children: [
              {
                'ui:columns': {
                  children: ['line_1', 'line_2', 'city'],
                  className: 'col-span-12',
                },
              },
              {
                'ui:row': {
                  children: [
                    {
                      'ui:columns': {
                        children: ['state', 'postal_code'],
                        className: 'col-span-6',
                      },
                    },
                  ],
                  className: 'grid-cols-12 col-span-12',
                },
              },
            ],
            className: 'grid grid-cols-12 gap-4',
          },
        },
      },
      race: {
        'ui:options': {
          widget: 'checkboxes',
        },
      },
      'ui:field': 'LayoutHeaderField',
    },
    'ui:field': 'LayoutGridField',
    'ui:layoutGrid': {
      'ui:row': [
        {
          'ui:row': {
            children: [
              {
                'ui:col': {
                  children: ['person'],
                },
              },
            ],
            className: 'grid grid-cols-1 gap-4 col-span-12',
          },
        },
        {
          'ui:row': {
            children: [
              {
                'ui:columns': {
                  children: [
                    'person.name.first',
                    'person.name.middle',
                    'person.name.last',
                  ],
                  className: 'col-span-4',
                },
              },
            ],
            className: 'grid grid-cols-12 gap-4 col-span-12',
          },
        },
        {
          'ui:row': {
            children: [
              {
                'ui:col': {
                  children: [
                    {
                      name: 'person.birth_date',
                      placeholder: '$lookup=PlaceholderText',
                    },
                  ],
                  className: 'col-span-3',
                },
              },
              {
                'ui:col': {
                  children: ['person.race'],
                  className: 'col-span-6',
                },
              },
            ],
            className: 'grid grid-cols-12 gap-4 col-span-12',
          },
        },
        {
          'ui:row': {
            children: [
              {
                'ui:col': {
                  children: ['person.address'],
                  className: 'col-span-6 row-span-4',
                },
              },
              {
                'ui:col': {
                  children: ['employment'],
                  className: 'col-span-6 row-span-1 flex items-center',
                },
              },
              {
                'ui:condition': {
                  children: [
                    {
                      'ui:columns': {
                        children: ['employment.business', 'employment.title'],
                        className: 'col-span-6 row-span-1',
                      },
                    },
                    {
                      'ui:col': {
                        children: ['employment.location.city'],
                        className: 'col-span-4 row-span-1',
                      },
                    },
                    {
                      'ui:col': {
                        children: ['employment.location.state'],
                        className: 'col-span-2 row-span-1',
                      },
                    },
                  ],
                  field: 'employment.job_type',
                  operator: 'all',
                  value: 'company',
                },
              },
              {
                'ui:condition': {
                  children: [
                    {
                      'ui:columns': {
                        children: [
                          'employment.district',
                          'employment.school',
                          'employment.title',
                        ],
                        className: 'col-span-6 row-span-1',
                      },
                    },
                    {
                      'ui:col': {
                        children: ['employment.location.city'],
                        className: 'col-span-4 row-span-1',
                      },
                    },
                    {
                      'ui:col': {
                        children: ['employment.location.state'],
                        className: 'col-span-2 row-span-1',
                      },
                    },
                  ],
                  field: 'employment.job_type',
                  operator: 'all',
                  value: 'education',
                },
              },
              {
                'ui:condition': {
                  children: [
                    {
                      'ui:columns': {
                        children: [
                          {
                            name: 'employment.description',
                            rows: 6,
                          },
                        ],
                        className: 'col-span-6 row-span-3',
                      },
                    },
                  ],
                  field: 'employment.job_type',
                  operator: 'all',
                  value: 'other',
                },
              },
            ],
            className: 'grid grid-cols-12 gap-4 col-span-12 grid-rows-4',
          },
        },
      ],
    },
  },
  Row2Columns: { className: 'grid grid-cols-12 gap-4 col-span-12' },
  Row3Columns: { className: 'grid grid-cols-12 gap-4 col-span-12' },
});
