import { withCookies } from 'react-cookie';
import styles from '../css/main.module.css';
import TagButton from '../common/tagButton';
import CardButton from '../common/cardButton';
import DrillCardButton from '../common/drillCardButton';

const Memo2 = (props) => {
  return (
    <div className={styles['background-wrapper']}
      style={{ backgroundImage: 'url("/static/react/images/login_background2.webp")' }}>
      <div className={styles['background-wrapper2']}>

        <div className={styles['content-container']}>
          <div
            className={styles['title-container']}
            style={{ display: 'block', margin: '20px', paddingLeft: '10%' }}
          >
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', whiteSpace: 'nowrap', }}>エビングハウス メモ帳２</h2>
            <p style={{ fontSize: '1.5rem' }}>{props.cookies.get('username')} さん</p>
          </div>

          <div className={styles['memo-container']}>
            <div className={styles['memo-upper-container']}>
              <CardButton
                titleText="復習"
                detailText1="1,7,28日前に登録したメモ"
                href="/memo2/review"
              />
              <CardButton titleText="ＡＬＬ" detailText1="" href="/memo2/all" />
            </div>
            <div className={styles['memo-under-container']}>
              <DrillCardButton titleText="メモ帳２ドリル" link="memo2" />
            </div>
          </div>
        </div>
        <TagButton
          text="メモ２登録"
          link="/memo2/create"
          top="15%"
          backgroundColor="rgba(231, 76, 115, 0.9)"
          color="white"
        />
        <TagButton
          text="編集"
          link="/memo2list"
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
    </div>
  );
};

export default withCookies(Memo2);
