import { arrayTests } from '@rjsf/snapshot-tests';
import Form from '../src';

arrayTests(Form as Parameters<typeof arrayTests>[0]);
