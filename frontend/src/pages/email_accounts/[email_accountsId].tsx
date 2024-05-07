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

import { update, fetch } from '../../stores/email_accounts/email_accountsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditEmail_accounts = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    email_provider: '',

    email_address: '',

    password: '',

    user: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { email_accounts } = useAppSelector((state) => state.email_accounts);

  const { email_accountsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: email_accountsId }));
  }, [email_accountsId]);

  useEffect(() => {
    if (typeof email_accounts === 'object') {
      setInitialValues(email_accounts);
    }
  }, [email_accounts]);

  useEffect(() => {
    if (typeof email_accounts === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = email_accounts[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [email_accounts]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: email_accountsId, data }));
    await router.push('/email_accounts/email_accounts-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit email_accounts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit email_accounts'}
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
              <FormField label='EmailProvider'>
                <Field name='email_provider' placeholder='EmailProvider' />
              </FormField>

              <FormField label='EmailAddress'>
                <Field name='email_address' placeholder='EmailAddress' />
              </FormField>

              <FormField label='Password'>
                <Field name='password' placeholder='Password' />
              </FormField>

              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
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
                  onClick={() =>
                    router.push('/email_accounts/email_accounts-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditEmail_accounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_EMAIL_ACCOUNTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditEmail_accounts;
