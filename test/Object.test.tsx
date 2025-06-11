import { objectTests } from '@rjsf/snapshot-tests';
import Form from '../src';

objectTests(Form as Parameters<typeof objectTests>[0]);
