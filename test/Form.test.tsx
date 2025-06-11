import { formTests } from '@rjsf/snapshot-tests';
import Form from '../src';

formTests(Form as Parameters<typeof formTests>[0]);
