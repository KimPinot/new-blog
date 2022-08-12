import { ArticleLayout } from "components/layout/ArticleLayout";
import { Collapse, Section } from "components/markdown/layout";
import { Ul } from "components/markdown/list";
import { Code, H1, P } from "components/markdown/typography";
import { NextPage } from "next";
import { HTMLProps, useReducer } from "react";

const SectionTitle = ({ children }: HTMLProps<typeof H1>) => (
  <H1 className="tracking-widest uppercase text-gray-600 font-light">{children}</H1>
);

const Work = ({ period = "", title = "", role = "", link = "" }) => (
  <p className="text-gray-900 font-semibold">
    <Code className="font-normal">{period}</Code>{" "}
    {link ? (
      <a className="underline underline-offset-4" href={link} target="_blank" rel="noreferrer">
        {title}
      </a>
    ) : (
      <b className="font-semibold">{title}</b>
    )}{" "}
    <i className="text-base text-gray-400 font-normal">{role}</i>
  </p>
);

const Li = ({ children }: HTMLProps<HTMLLIElement>) => (
  <li>
    <div className="flex flex-col gap-2">{children}</div>
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
      <CVSection>
        <SectionTitle>Work Experience</SectionTitle>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2022. 01" title="에스씨브이소프트" role="소프트웨어 엔지니어" />
          </Li>
          <Li>
            <Work period="2021. 12 ~" title="유엑스닷" role="기술 총괄 디렉터" />
          </Li>
          <Li>
            <Work period="2021. 06 ~ 2022. 12" title="피터스앤마이어스" role="소프트웨어 엔지니어 (프리랜서)" />
          </Li>
          <Li>
            <Work
              period="2021. 01 ~ 2021. 03"
              title="비포플레이"
              role="프론트엔드 개발자 (프리랜서)"
              link="//www.b4play.io"
            />
          </Li>
        </Ul>
      </CVSection>
      <CVSection>
        <SectionTitle>EDUCATION</SectionTitle>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2019. 03 ~ 2022. 02" title="군포e비즈니스고등학교" role="스마트소프트웨어학과" />
          </Li>
        </Ul>
      </CVSection>
      <CVSection>
        <SectionTitle>AWARDS</SectionTitle>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2020. 10" title="건국대학교 애니멀 헬스 해커톤" role="프론트엔드 엔지니어, 팀장" />
            <Collapse collapse={less}>
              <P>집에 가고싶다</P>
            </Collapse>
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
        <SectionTitle>PROJECTS</SectionTitle>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work
              period="2022. 02 ~"
              title="Socket.io로 채팅 서비스 만들어보기"
              role=""
              link="//nabi.kim/categories/만들기/Socket-io로-채팅-서비스-만들어보기/"
            />
          </Li>
          <Li>
            <Work period="2021. 12 ~" title="개인 기술 블로그" role="" link="//nabi.kim" />
          </Li>
          <Li>
            <Work
              period="2020. 10 ~ 2021. 10"
              title="무균전시 : 새 시대 새 빛"
              role="풀스택 개발자"
              link="//2021exhibition.online"
            />
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
        <SectionTitle>Other Experience</SectionTitle>
        <Ul className="flex flex-col gap-3">
          <Li>
            <Work period="2022. 08" title="JUNCTION ASIA 2022" role="자원봉사자" link="//asia.hackjunction.com/ko" />
          </Li>
          <Li>
            <Work period="2022. 07" title="2022 고려대학교 X 연세대학교 합동 해커톤" role="멘토, 프론트엔드" />
          </Li>
          <Li>
            <Work period="2022. 07" title="2022 서울 퀴어문화축제" role="자원봉사자, 굿즈팀" link="//www.sqcf.org/" />
          </Li>
        </Ul>
      </CVSection>
    </ArticleLayout>
  );
};

export default CV;
