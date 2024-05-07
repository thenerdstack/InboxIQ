import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/emails/emailsSlice';
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

const EmailsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { emails } = useAppSelector((state) => state.emails);

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
        <title>{getPageTitle('View emails')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View emails')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Subject</p>
            <p>{emails?.subject}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Body</p>
            {emails.body ? (
              <p dangerouslySetInnerHTML={{ __html: emails.body }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <FormField label='ReceivedAt'>
            {emails.received_at ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  emails.received_at
                    ? new Date(
                        dayjs(emails.received_at).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No ReceivedAt</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>EmailAccount</p>

            <p>{emails?.email_account?.email_address ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>SuggestedResponses</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ResponseText</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.suggested_responses &&
                      Array.isArray(emails.suggested_responses) &&
                      emails.suggested_responses.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/suggested_responses/suggested_responses-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='response_text'>
                            {item.response_text}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!emails?.suggested_responses?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Suggested_responses Email</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ResponseText</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.suggested_responses_email &&
                      Array.isArray(emails.suggested_responses_email) &&
                      emails.suggested_responses_email.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/suggested_responses/suggested_responses-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='response_text'>
                            {item.response_text}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!emails?.suggested_responses_email?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/emails/emails-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

EmailsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_EMAILS'}>{page}</LayoutAuthenticated>
  );
};

export default EmailsView;
