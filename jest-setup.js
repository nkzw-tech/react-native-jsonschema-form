// eslint-disable-next-line import-x/no-unresolved
import { expect } from '@jest/globals';
import snapshotDeleteProperties from 'jest-snapshot-delete-properties';

expect.addSnapshotSerializer(snapshotDeleteProperties.default(['data-testid']));
