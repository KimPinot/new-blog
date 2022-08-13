import classcat from "classcat";
import { ArticleLayout } from "components/layout/ArticleLayout";
import { Collapse, Section } from "components/markdown/layout";
import { Ul } from "components/markdown/list";
import { Code, H1, P } from "components/markdown/typography";
import { NextPage } from "next";
import { HTMLProps, useReducer } from "react";

const A = ({ children, href }: HTMLProps<HTMLAnchorElement>) => {
  return (
    <a
      className="underline underline-offset-4 decoration-1 hover:text-primary transition-[color]"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

const Work = ({ period = "", title = "", role = "", link = "" }) => (
  <p className="text-gray-900 font-semibold">
    <Code className="font-normal">{period}</Code>{" "}
    {link ? <A href={link}>{title}</A> : <b className="font-semibold">{title}</b>}{" "}
    <i className="text-base text-gray-400 font-normal">{role}</i>
  </p>
);

const Li = ({ className, children }: HTMLProps<HTMLLIElement>) => (
  <li>
    <div className={classcat(["flex flex-col gap-1", className])}>{children}</div>
  </li>
);

const CVSection = ({ children }: HTMLProps<typeof Section>) => (
  <Section className="flex flex-col gap-2 py-4">{children}</Section>
);

const CV: NextPage = () => {
  const [less, toggle] = useReducer((r) => !r, false);

  const LessToggle = () => (
    <span>
      <button className="btn btn-xs" onClick={toggle}>
        전체 이력 {less ? "숨기기" : "보기"}
      </button>
    </span>
  );

  return (
    <ArticleLayout
      id={"CV"}
      title={"CV"}
      description={"우리들의 상상은 언제나 현실이 될 수 있습니다. 안녕하세요. 프론트엔드 개발자 나비입니다."}
      date={+new Date(2022, 7, 12, 16, 19, 1)}
    >
      <CVSection id="main">
        <H1>우리들의 상상은 언제나 현실이 될 수 있습니다.</H1>
        <P>
          누군가의 상상을 현실로 만드는 프로그래머입니다.
          <br />
          우연히 서점에서 파는 마크업 책을 시작으로 많은 사람들의 상상을 현실로 만들기 위해서 열심히 일하고 있습니다.
        </P>
        <LessToggle />
      </CVSection>
      <b>해당 문서는 아직 작성중입니다!</b>
      <CVSection>
        <H1>Work Experience</H1>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2022. 01" title="에스씨브이소프트" role="소프트웨어 엔지니어" link="//scvsoft.net/" />
            <Collapse collapse={less} className="flex flex-col gap-1">
              <P className="text-sm">
                블록체인으로 세상을 바꾸는 에스씨브이소프트에서 소프트웨어 엔지니어로 근무하고 있습니다.
                <br />
                다양한 업계의 회사와 협업하고 있으며, NextJS를 사용한 프론트엔드 업무, AWS를 사용한 간단한 DevOps 업무를
                병행하고 있습니다.
                <br />
                최근에는 테크리드로써 사내 개발 문화 개선을 위하여 코드리뷰 도입 등 다양한 방법을 시도하고 있습니다.
                <br />
              </P>
            </Collapse>
            <Ul className="flex flex-col gap-1">
              <Li>
                <Work period="2022. 06 ~ " role="테크리드" />
                <Collapse collapse={less}>
                  <P className="text-sm">
                    테크리드로써 사내 개발 문화 개선을 위하여 코드리뷰 도입 등 다양한 방법을 시도하고 있습니다.
                    <br />
                    단순하게 팀원들의 개발과 관련된 고민들을 들어주거나, 뭐시깽이를 자주 했습니다
                  </P>
                </Collapse>
              </Li>
              <Li>
                <Work period="2022. 01 ~ " role="프론트엔드 개발자" />
                <Collapse collapse={less}>
                  <P className="text-sm">
                    Front-End :
                    <br />
                    Back-End :
                    <br />
                    Web3 :
                  </P>
                </Collapse>
              </Li>
            </Ul>
          </Li>
          <Li>
            <Work period="2021. 12 ~" title="유엑스닷" role="외부 기술 총괄 디렉터" />
            <Collapse collapse={less} className="flex flex-col gap-3">
              <P className="text-sm">
                경험 디자인 스튜디오 유엑스닷에서 외부 기술 총괄 디렉터로 소속되어 있습니다.
                <br />
                부산을 기반으로 하는 다양한 클라이언트들과 협업하고 있으며, 개발자가 소수인 디자인 스튜디오의 특성상
                <br />
                최소한의 커뮤니케이션으로 최대한의 효과를 얻어낼 수 있는 방법을 항상 고민하고 있습니다.
              </P>
            </Collapse>
          </Li>
          <Li>
            <Work period="2021. 06 ~ 2022. 12" title="피터스앤마이어스" role="소프트웨어 엔지니어 (프리랜서)" />
            {/* <Collapse collapse={less}>
              <P className="text-sm">TBD</P>
            </Collapse> */}
          </Li>
          <Li>
            <Work
              period="2021. 01 ~ 2021. 03"
              title="비포플레이"
              role="프론트엔드 개발자 (프리랜서)"
              link="//www.b4play.io"
            />
            {/* <Collapse collapse={less}>
              <P className="text-sm">TBD</P>
            </Collapse> */}
          </Li>
        </Ul>
      </CVSection>
      <CVSection>
        <H1>Education</H1>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2019. 03 ~ 2022. 02" title="군포e비즈니스고등학교" role="스마트소프트웨어학과 (졸업)" />
            <Collapse collapse={less}>
              <P className="text-sm">
                IT 계열 특성화 고등학교인 군포e비즈니스고등학교에서 컴퓨터과학과 관련된 기초적인 지식을 배웠습니다.
                <br />
                전공수업에서는 안드로이드 스튜디오, 유니티, MySQL, Python을 사용한 데이터 정렬, HTML/CSS와 같이 실무에서
                자주 사용하는 기술들을 배웠습니다.
                <br />
                2학년부터는 학교와 업무를 같이 병행하며 서비스를 만들거나 다양한 회사와 협업을 해본 경험이 있습니다.
              </P>
            </Collapse>
          </Li>
        </Ul>
      </CVSection>
      <CVSection>
        <H1>Awards</H1>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2020. 10" title="건국대학교 애니멀 헬스 해커톤" role="프론트엔드 엔지니어, 팀장" />
            <Ul>
              <Li>
                <i className="text-gray-400">장려상 · 팀 “pillpet” · 건국대학교</i>
              </Li>
            </Ul>
          </Li>
          <Li>
            <Work period="2020. 07" title="AngelHack Seoul 2020 ONLINE" role="프론트엔드 엔지니어, 팀장" />
            <Ul>
              <Li>
                <i className="text-gray-400">
                  <b>우승</b> · 팀 “specialty” · 우아한형제들 : 책임감 있는 생산과 소비 부문
                </i>
              </Li>
            </Ul>
          </Li>
          <Li>
            <Work period="2020. 04" title="IBM Call For Code" role="프론트엔드 엔지니어, 팀장" />
            <Ul>
              <Li>
                <i className="text-gray-400">
                  <b>우승</b> · 팀 “Ithaca” · 환경재단
                </i>
              </Li>
            </Ul>
          </Li>
          <Li>
            <Work period="2019. 11" title="2019 블록체인 아이디어톤" role="프론트엔드 엔지니어" />
            <Ul>
              <Li>
                <i className="text-gray-400">우수상 · 팀 “모두의 리콜” · 한국인터넷진흥원</i>
              </Li>
            </Ul>
          </Li>
          <Li>
            <Work period="2019. 10" title="2019 서울 인공지능 챗봇톤" role="프론트엔드 엔지니어, 팀장" />
            <Ul>
              <Li>
                <i className="text-gray-400">장려상 · 팀 “서아키” · 서울디지털재단</i>
              </Li>
            </Ul>
          </Li>
        </Ul>
      </CVSection>
      <CVSection className="gap-2 pb-4">
        <H1>Projects</H1>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2022. 06 ~ 2022. 08" title="프로젝트 A : (비공개)" role="프론트엔드 개발자" />
            <Collapse collapse={less}>
              <Ul className="text-sm flex flex-col gap-1">
                <li>Klaytn 기반의 컨트랙트에서 동작하는 NFT 민팅 페이지와 소개 페이지를 개발했습니다.</li>
                <li>NFT 구매, 현재 소유 개수 확인 등 다양한 기능들을 컨트랙트 콜을 하는 방식으로 작업했습니다.</li>
              </Ul>
            </Collapse>
          </Li>
          <Li>
            <Work
              period="2022. 02 ~"
              title="Socket.io로 채팅 서비스 만들어보기"
              role=""
              link="//github.com/KimPinot/nextjs-chat"
            />
            <Collapse collapse={less}>
              <Ul className="text-sm flex flex-col gap-1">
                <li>평소 흥미를 가지고 있던 WebSocket을 실전에서 사용해보고자 만들고 있는 프로젝트입니다. (작성중)</li>
                <li>
                  <A href="//nextjs.org">Next.js</A>와 <A href="//reactjs.org">React</A> 그리고{" "}
                  <A href="//www.typescriptlang.org">Typescript</A>를 사용하여 제작했으며 WebSocket 라이브러리로는{" "}
                  <A href="//socket.io">Socket.io</A>를 사용하고 있습니다.
                </li>
              </Ul>
            </Collapse>
          </Li>
          <Li>
            <Work period="2021. 12 ~" title="개인 기술 블로그" role="" link="//nabi.kim" />
            <Collapse collapse={less}>
              <Ul className="text-sm flex flex-col gap-1">
                <li>
                  <A href="//github.com/KimPinot/plog-old">NextJS로 된 블로그</A>을 관리하기 힘들어{" "}
                  <A href="//old.nabi.kim">Hexo로 기반으로 하는 블로그</A>를 만들었다가 다시 NextJS로 옮긴 블로그
                  프로젝트입니다.
                </li>
                <li>NextJS SSG를 사용하여 초기 렌더링 시간을 획기적으로 단축했습니다.</li>
                <li>Github Actions를 사용하여 새로운 글을 작성하거나 기능을 만들었을때의 배포를 자동화 했습니다.</li>
                <li>CV를 블로그에 올리는 작업 말고도 여러 실험들을 해보고자 계획하고 있습니다.</li>
              </Ul>
            </Collapse>
          </Li>
          <Li>
            <Work
              period="2020. 10 ~ 2021. 10"
              title="무균전시 : 새 시대 새 빛"
              role="풀스택 개발자"
              link="//2021exhibition.online"
            />
            <Collapse collapse={less}>
              <Ul className="text-sm flex flex-col gap-1">
                <li>
                  프론트엔드는 Next.js와 React 그리고 Typescript를 사용해 제작했습니다. UI는 scss를 사용하여
                  구성되었습니다.
                </li>
                <li>백엔드는 Next.js API Prisma와 Typescript를 사용해 제작되고 있습니다.</li>
                <li>
                  프론트엔드와 백엔드는 처음에는 Docker 이미지로 빌드해 Blue-Green 배포로 AWS EC2에 배포되었으나, 빠른
                  배포를 위해 지금은 Vercel으로 배포되고 있습니다.
                </li>
              </Ul>
            </Collapse>
          </Li>
          <Li>
            <Work
              period="2019. 12 ~ 2020. 06"
              title="성연인더스트리"
              role="프론트엔드 개발자 (프리랜서)"
              link="//sungyun.kr"
            />
          </Li>
          <Li>
            <Work
              period="2019. 07 ~ 2019. 08"
              title="APPERZ 홈페이지"
              role=""
              link="//github.com/KimPinot/APPERZ-MAIN"
            />
          </Li>
        </Ul>
      </CVSection>
      <CVSection className="gap-2 pb-4">
        <H1>Other Experience</H1>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2022. 08" title="JUNCTION ASIA 2022" role="자원봉사자" link="//asia.hackjunction.com/ko" />
            <Collapse collapse={less}>
              <Ul className="flex flex-col gap-2">
                <Li className="text-sm">TBD</Li>
              </Ul>
            </Collapse>
          </Li>
          <Li>
            <Work period="2022. 07" title="2022 고려대학교 X 연세대학교 합동 해커톤" role="멘토, 프론트엔드" />
            <Collapse collapse={less}>
              <Ul className="flex flex-col gap-2">
                <Li className="text-sm">
                  해커톤에 참여한 학생들에게 프론트엔드 개발과 서비스 기획에 대한 멘토링을 진행했습니다.
                </Li>
              </Ul>
            </Collapse>
          </Li>
          <Li>
            <Work period="2022. 07" title="2022 서울 퀴어문화축제" role="자원봉사자, 굿즈팀" link="//www.sqcf.org/" />
            <Collapse collapse={less}>
              <Ul className="flex flex-col gap-2">
                <Li className="text-sm">
                  굿즈팀 자원봉사자로 참여하여 수만명이 넘는 인파를 통제하거나, 굿즈를 홍보했습니다.
                </Li>
                <Li className="text-sm">
                  자원봉사자로 일하며 많은 사람들 앞에서 자신의 상품을 판매하거나 사람들을 통제하는 노하우를 얻었습니다.
                </Li>
              </Ul>
            </Collapse>
          </Li>
        </Ul>
      </CVSection>
    </ArticleLayout>
  );
};

export default CV;
