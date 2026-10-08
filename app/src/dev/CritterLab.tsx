import { View } from 'react-native';

import {
  Card,
  CritterAvatar,
  HEADS,
  MOOD_MEANING,
  MOODS,
  ROSTER,
  Screen,
  T,
  colors,
  critterBodies,
  type CritterBody,
  type CritterName,
} from '../ui';

/**
 * Dev-only review page for the critter art (D-024). Not app UI.
 * Shows each drawn critter in every mood at full size, then the 48px and
 * 22px checks (the widget's face stack), then every body colour.
 */
const BODIES = Object.keys(critterBodies) as CritterBody[];
const SAMPLE_BODY: Record<string, CritterBody> = { Capy: 'butter', Kip: 'skyGrey', Fen: 'peach', Bun: 'lilac', Ribbs: 'mint', Ollie: 'blushSand' };

export function CritterLab() {
  const drawn = ROSTER.filter((r) => HEADS[r.name as CritterName]);
  return (
    <Screen>
      <T v="title">Critter lab</T>
      <T v="body">
        {drawn.length} of {ROSTER.length} critters drawn. The rest show a letter until their art lands.
      </T>

      {drawn.map((c) => {
        const body = SAMPLE_BODY[c.name] ?? 'butter';
        return (
          <Card key={c.name} style={{ gap: 12 }}>
            <View style={{ gap: 2 }}>
              <T v="heading">
                {c.name} · {c.animal}
              </T>
              <T v="caption">“{c.line}”</T>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {MOODS.map((m) => (
                <View key={m} style={{ alignItems: 'center', gap: 6 }}>
                  <CritterAvatar critter={c.name} body={body} mood={m} pick={m === 'sleepy' ? undefined : m === 'happy' ? 'a' : 'b'} size={92} />
                  <T v="label">{m}</T>
                  <T v="caption" style={{ fontSize: 10 }}>
                    {MOOD_MEANING[m]}
                  </T>
                </View>
              ))}
            </View>
          </Card>
        );
      })}

      <Card style={{ gap: 12 }}>
        <T v="label" style={{ color: colors.plum3, textTransform: 'uppercase', fontSize: 10.5, letterSpacing: 0.8 }}>
          Size check: 48px
        </T>
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          {ROSTER.map((c, i) => (
            <CritterAvatar key={c.name} critter={c.name} body={BODIES[i % BODIES.length]} pick={i % 2 ? 'b' : 'a'} size={48} />
          ))}
        </View>
        <T v="label" style={{ color: colors.plum3, textTransform: 'uppercase', fontSize: 10.5, letterSpacing: 0.8 }}>
          Size check: 22px (widget face stack)
        </T>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {ROSTER.map((c, i) => (
            <CritterAvatar key={c.name} critter={c.name} body={BODIES[i % BODIES.length]} pick={i % 2 ? 'b' : 'a'} size={22} />
          ))}
        </View>
        <T v="caption">Can you tell Capy, Kip and Fen apart by outline alone at 22px?</T>
      </Card>

      <Card style={{ gap: 12 }}>
        <T v="label" style={{ color: colors.plum3, textTransform: 'uppercase', fontSize: 10.5, letterSpacing: 0.8 }}>
          Every body colour
        </T>
        {drawn.map((c) => (
          <View key={c.name} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {BODIES.map((b) => (
              <CritterAvatar key={b} critter={c.name} body={b} size={40} />
            ))}
          </View>
        ))}
      </Card>
    </Screen>
  );
}
