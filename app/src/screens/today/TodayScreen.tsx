import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import {
  AnswerPill,
  AvatarStack,
  Card,
  Chip,
  CritterAvatar,
  ResultBar,
  Screen,
  T,
  TabBar,
  colors,
  fonts,
  optionColors,
  type Option,
} from '../../ui';
import {
  CIRCLES,
  EVERYONE_PERCENT_A,
  MOST_DIVISIVE_THIS_WEEK,
  REACTIONS,
  TODAY,
  TWIN,
  YESTERDAY,
  type Circle,
  type Community,
  type FriendGroup,
} from './mockData';

/**
 * TODAY screen: MOCKUP with dummy data (D-023, ROADMAP 5.6). Pass 2 swaps
 * ./mockData for Greg's data layer; the layout should not need to change.
 *
 * States (MVP-SPEC §4, §7):
 *  - beforeDrop: yesterday's results + "new question this morning"
 *  - open, not voted: the question; results stay HIDDEN until you vote
 *  - voted: your pick, your circle's split, who picked what, insights
 *
 * Friend groups show names + picks (D-004). Communities show totals only:
 * no member list, no individual picks, no reactions (D-018).
 */
export type TodayPhase = 'beforeDrop' | 'open';

const ICON: Record<Option, string> = { a: '👁️', b: '🔮' };
const other = (o: Option): Option => (o === 'a' ? 'b' : 'a');

export function TodayScreen({ phase, initialPick }: { phase: TodayPhase; initialPick?: Option }) {
  const [pick, setPick] = useState<Option | undefined>(initialPick);
  const [circleId, setCircleId] = useState(CIRCLES[0].id);
  const circle = CIRCLES.find((c) => c.id === circleId) ?? CIRCLES[0];

  return (
    <Screen footer={<TabBar active="today" />}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <T v="wordmark">WidgetRather</T>
        <Pressable
          accessibilityLabel="Join or create a group"
          style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.lavChip, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontFamily: fonts.bold, fontSize: 18, color: colors.plum2 }}>+</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {CIRCLES.map((c) => (
          <Chip key={c.id} label={c.kind === 'community' ? `🌐 ${c.name}` : c.name} selected={c.id === circleId} onPress={() => setCircleId(c.id)} />
        ))}
      </ScrollView>

      {phase === 'beforeDrop' ? (
        <BeforeDrop />
      ) : (
        <>
          <QuestionCard pick={pick} circle={circle} onPick={setPick} />
          {pick ? (
            <>
              {circle.kind === 'friends' ? (
                <FriendResults group={circle} myPick={pick} />
              ) : (
                <CommunityResults community={circle} />
              )}
              <Insights myPick={pick} />
            </>
          ) : (
            <T v="caption" style={{ textAlign: 'center' }}>
              Pick one to see how {circle.name} split.
            </T>
          )}
        </>
      )}
    </Screen>
  );
}

/* ---------------------------------------------------------------- */

function BeforeDrop() {
  const y = YESTERDAY;
  return (
    <>
      <Card style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 34 }}>{'😴'}</Text>
        <T v="heading">New question drops this morning</T>
        <T v="caption" style={{ textAlign: 'center' }}>
          Same moment for everyone near you. Keep the widget on your home screen.
        </T>
      </Card>
      <T v="heading">Yesterday</T>
      <Card>
        <T v="question">Would you rather</T>
        <AnswerPill option={y.myPick} label={y.question[y.myPick]} picked size="md" />
        <AnswerPill option={other(y.myPick)} label={y.question[other(y.myPick)]} dimmed size="md" />
        <View style={{ gap: 6, marginTop: 4 }}>
          <ResultBar label={y.question.a} percent={y.groupPercentA} option="a" variant="stacked" />
          <ResultBar label={y.question.b} percent={100 - y.groupPercentA} option="b" variant="stacked" />
        </View>
      </Card>
    </>
  );
}

function QuestionCard({ pick, circle, onPick }: { pick?: Option; circle: Circle; onPick: (o: Option) => void }) {
  return (
    <Card>
      <T v="question" style={{ textAlign: 'center' }}>
        Would you rather
      </T>
      {pick ? (
        <>
          <AnswerPill option={pick} label={TODAY[pick]} picked size="lg" />
          <T v="label" style={{ textAlign: 'center' }}>
            {agreeLine(pick, circle)}
          </T>
        </>
      ) : (
        (['a', 'b'] as Option[]).map((o) => (
          <AnswerPill
            key={o}
            option={o}
            label={TODAY[o]}
            icon={<Text style={{ fontSize: 17 }}>{ICON[o]}</Text>}
            size="lg"
            onPress={() => onPick(o)}
          />
        ))
      )}
    </Card>
  );
}

function agreeLine(pick: Option, circle: Circle): string {
  if (circle.kind === 'community') {
    const pct = pick === 'a' ? circle.percentA : 100 - circle.percentA;
    return `You and ${pct}% of ${circle.name} agree`;
  }
  const n = circle.members.filter((m) => m.pick === pick).length;
  return n === 0 ? 'Nobody else picked this. Yet.' : `You and ${n} ${n === 1 ? 'friend' : 'friends'} agree 🎉`;
}

function FriendResults({ group, myPick }: { group: FriendGroup; myPick: Option }) {
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [openFor, setOpenFor] = useState<string | null>(null);

  const answered = group.members.filter((m) => m.pick);
  const countA = answered.filter((m) => m.pick === 'a').length + (myPick === 'a' ? 1 : 0);
  const total = answered.length + 1; // + you
  const pctA = Math.round((countA / total) * 100);
  const waiting = group.members.length - answered.length;

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <T v="heading">{group.name}</T>
        <AvatarStack people={answered.map((m) => ({ critter: m.critter, body: m.body, pick: m.pick }))} />
      </View>
      <View style={{ gap: 7 }}>
        <ResultBar label={TODAY.a} percent={pctA} option="a" />
        <ResultBar label={TODAY.b} percent={100 - pctA} option="b" />
      </View>

      <Card style={{ gap: 4, paddingVertical: 10 }}>
        <T v="caption" style={{ marginBottom: 4 }}>
          Who picked what{waiting > 0 ? ` · ${waiting} still deciding` : ''}
        </T>
        {answered.map((m) => (
          <View key={m.name}>
            <Pressable
              onPress={() => setOpenFor(openFor === m.name ? null : m.name)}
              accessibilityLabel={`${m.name} picked ${TODAY[m.pick!]}. React`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 }}
            >
              <CritterAvatar critter={m.critter} body={m.body} pick={m.pick} size={30} />
              <T v="label" style={{ flex: 1, color: colors.plum }}>
                {m.name}
              </T>
              <View style={{ paddingVertical: 3, paddingHorizontal: 9, borderRadius: 999, backgroundColor: optionColors[m.pick!].light }}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 11, color: colors.plum }}>{TODAY[m.pick!]}</Text>
              </View>
              <Text style={{ fontSize: 16, width: 22, textAlign: 'center' }}>{reactions[m.name] ?? '☺︎'}</Text>
            </Pressable>
            {openFor === m.name && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 6, backgroundColor: colors.lavChip, borderRadius: 12 }}>
                {REACTIONS.map((e) => (
                  <Pressable
                    key={e}
                    accessibilityLabel={`React ${e}`}
                    onPress={() => {
                      setReactions((r) => ({ ...r, [m.name]: e }));
                      setOpenFor(null);
                    }}
                  >
                    <Text style={{ fontSize: 22 }}>{e}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        ))}
      </Card>
    </>
  );
}

function CommunityResults({ community }: { community: Community }) {
  const diff = community.percentA - EVERYONE_PERCENT_A;
  const leaning: Option = diff >= 0 ? 'a' : 'b';
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <T v="heading">{community.name}</T>
        <T v="caption">{community.memberCount} members</T>
      </View>
      <View style={{ gap: 7 }}>
        <ResultBar label={TODAY.a} percent={community.percentA} option="a" />
        <ResultBar label={TODAY.b} percent={100 - community.percentA} option="b" />
      </View>
      <Card style={{ gap: 4 }}>
        <T v="label">{'🌐'} Community vs everyone</T>
        <T v="body">
          {Math.abs(diff) < 5
            ? `${community.name} split about the same as everyone else.`
            : `${community.name} is way more ${TODAY[leaning]} than everyone else (+${Math.abs(diff)}).`}
        </T>
        <T v="caption" style={{ marginTop: 4 }}>
          Communities show totals only. Names and reactions stay in your friend groups.
        </T>
      </Card>
    </>
  );
}

function Insights({ myPick }: { myPick: Option }) {
  const myPct = myPick === 'a' ? EVERYONE_PERCENT_A : 100 - EVERYONE_PERCENT_A;
  const rare =
    myPct <= 25 ? `Only ${myPct}% picked this. You're rare.` : myPct >= 75 ? `You're with ${myPct}% of people.` : `Split: ${myPct}/${100 - myPct}.`;
  return (
    <Card style={{ gap: 6 }}>
      <T v="label">{'✨'} Rare pick</T>
      <T v="body">{rare}</T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
        <CritterAvatar critter={TWIN.critter} body={TWIN.body} pick={myPick} size={24} />
        <T v="label">Your twin</T>
      </View>
      <T v="body">
        You and {TWIN.name} agree the most: {TWIN.matched} of the last {TWIN.of}.
      </T>
      <T v="label" style={{ marginTop: 6 }}>
        {'⚖️'} Split meter
      </T>
      <T v="body">
        Today split everyone {EVERYONE_PERCENT_A}/{100 - EVERYONE_PERCENT_A}
        {MOST_DIVISIVE_THIS_WEEK ? ', the most divisive question this week.' : '.'}
      </T>
    </Card>
  );
}
