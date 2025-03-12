import { withCookies } from 'react-cookie';
import styles from '../css/main.module.css';
import TagButton from '../common/tagButton';
import CardButton from '../common/cardButton';

const Sentence = (props) => {
  return (
    <div
      style={{
        backgroundImage: 'url("/static/react/images/login_background2.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        height: 'auto',
        color: '#d0d0d0',
        position: 'relative',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <div className={styles['content-container']}>
        <div
          className={styles['container']}
          style={{ display: 'block', margin: '20px', paddingLeft: '10%' }}
        >
          <h2 style={{ fontSize: '2.5rem' }}>エビングハウス 英語 例文帳</h2>
          <p style={{ fontSize: '1.5rem' }}>{props.cookies.get('username')} さん</p>
        </div>

        <div className={styles['memo-container']}>
          <div className={styles['memo-upper-container']}>
            <CardButton titleText="例文ＡＬＬ" detailText1="" href="/sentence/all" />
            <CardButton
              titleText="チェックリスト"
              detailText1="重点的に復習する例文（編集ボタンでチェック）"
              href="/sentence/checklist"
            />
          </div>
        </div>
      </div>
      <TagButton
        text="編集（チェック）"
        link="/sentencelist"
        top="25%"
        backgroundColor="rgba(52, 152, 219, 0.8)"
        color="white"
      />
      <TagButton
        text="TOP"
        link="/mainpage"
        top="35%"
        backgroundColor="rgba(46, 230, 113, 0.7)"
        color="rgba(50,50,50)"
        width="15rem"
      />
      <TagButton
        text="Logout"
        link="/"
        top="45%"
        backgroundColor="rgba(255, 170, 110, 0.8)"
        color="rgba(50,50,50)"
        logout={true}
        width="15rem"
      />
    </div>
  );
};

export default withCookies(Sentence);
