import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/email_accounts/email_accountsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const Email_accountsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email_accounts } = useAppSelector((state) => state.email_accounts);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View email_accounts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View email_accounts')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>EmailProvider</p>
            <p>{email_accounts?.email_provider}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>EmailAddress</p>
            <p>{email_accounts?.email_address}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Password</p>
            <p>{email_accounts?.password}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{email_accounts?.user?.firstName ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Emails EmailAccount</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>

                      <th>ReceivedAt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {email_accounts.emails_email_account &&
                      Array.isArray(email_accounts.emails_email_account) &&
                      email_accounts.emails_email_account.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/emails/emails-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='subject'>{item.subject}</td>

                          <td data-label='received_at'>
                            {dataFormatter.dateTimeFormatter(item.received_at)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!email_accounts?.emails_email_account?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/email_accounts/email_accounts-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Email_accountsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_EMAIL_ACCOUNTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Email_accountsView;
