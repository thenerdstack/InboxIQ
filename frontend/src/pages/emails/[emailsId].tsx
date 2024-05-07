import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/emails/emailsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditEmails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    subject: '',

    body: '',

    received_at: new Date(),

    email_account: '',

    suggested_responses: [],
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { emails } = useAppSelector((state) => state.emails);

  const { emailsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: emailsId }));
  }, [emailsId]);

  useEffect(() => {
    if (typeof emails === 'object') {
      setInitialValues(emails);
    }
  }, [emails]);

  useEffect(() => {
    if (typeof emails === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = emails[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [emails]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: emailsId, data }));
    await router.push('/emails/emails-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit emails')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit emails'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Subject'>
                <Field name='subject' placeholder='Subject' />
              </FormField>

              <FormField label='Body' hasTextareaHeight>
                <Field name='body' id='body' component={RichTextField}></Field>
              </FormField>

              <FormField label='ReceivedAt'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.received_at
                      ? new Date(
                          dayjs(initialValues.received_at).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, received_at: date })
                  }
                />
              </FormField>

              <FormField label='EmailAccount' labelFor='email_account'>
                <Field
                  name='email_account'
                  id='email_account'
                  component={SelectField}
                  options={initialValues.email_account}
                  itemRef={'email_accounts'}
                  showField={'email_address'}
                ></Field>
              </FormField>

              <FormField
                label='SuggestedResponses'
                labelFor='suggested_responses'
              >
                <Field
                  name='suggested_responses'
                  id='suggested_responses'
                  component={SelectFieldMany}
                  options={initialValues.suggested_responses}
                  itemRef={'suggested_responses'}
                  showField={'response_text'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/emails/emails-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditEmails.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_EMAILS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditEmails;
