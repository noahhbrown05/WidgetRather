import { StatusBar } from 'expo-status-bar';
import { useState, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';

import { TodayScreen } from '../screens/today/TodayScreen';
import { colors, fonts, useAppFonts } from '../ui';
import { CritterLab } from './CritterLab';
import { Gallery } from './Gallery';

type PreviewView = 'today-before' | 'today-open' | 'today-voted' | 'critters' | 'gallery' | 'widget-tools';

const VIEWS: { id: PreviewView; label: string }[] = [
  { id: 'today-before', label: 'Before drop' },
  { id: 'today-open', label: 'Open' },
  { id: 'today-voted', label: 'Voted' },
  { id: 'critters', label: 'Critters' },
  { id: 'gallery', label: 'Components' },
];

/** Shared review shell. Native supplies diagnostics; web never imports them. */
export function PreviewApp({ widgetTools }: { widgetTools?: ReactNode }) {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <PreviewContent widgetTools={widgetTools} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function PreviewContent({ widgetTools }: { widgetTools?: ReactNode }) {
  const fontsReady = useAppFonts();
  const [view, setView] = useState<PreviewView>('today-open');
  const [replay, setReplay] = useState(0);
  const views = widgetTools
    ? [...VIEWS, { id: 'widget-tools' as const, label: 'Widget tools' }]
    : VIEWS;

  if (!fontsReady) {
    return <ActivityIndicator accessibilityLabel="Loading preview fonts" color={colors.pink1} style={styles.loading} />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.toolbar}>
        <Text style={styles.notice}>
          {view === 'widget-tools' ? 'DEV · LOCAL WIDGET TOOLS' : 'DEV · SAMPLE DATA'}
        </Text>
        <View style={styles.controls}>
          {views.map((item) => (
            <PreviewButton key={item.id} selected={view === item.id} onPress={() => setView(item.id)}>
              {item.label}
            </PreviewButton>
          ))}
          {view.startsWith('today-') && (
            <PreviewButton
              accessibilityLabel="Replay vote demo"
              onPress={() => { setView('today-open'); setReplay((value) => value + 1); }}
            >
              ↻ Replay
            </PreviewButton>
          )}
        </View>
      </View>
      {view === 'widget-tools' ? widgetTools : view === 'gallery' ? (
        <Gallery />
      ) : view === 'critters' ? (
        <CritterLab />
      ) : (
        <TodayScreen
          key={`${view}-${replay}`}
          phase={view === 'today-before' ? 'beforeDrop' : 'open'}
          initialPick={view === 'today-voted' ? 'a' : undefined}
        />
      )}
    </View>
  );
}

function PreviewButton({ children, selected = false, onPress, accessibilityLabel }: {
  children: ReactNode;
  selected?: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.button, selected && styles.selectedButton, pressed && styles.pressedButton]}
    >
      <Text style={[styles.buttonText, selected && styles.selectedText]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.plum },
  root: { flex: 1 },
  loading: { flex: 1 },
  toolbar: { padding: 8, gap: 6, backgroundColor: colors.plum },
  notice: { fontFamily: fonts.bold, fontSize: 10, color: colors.pink1 },
  controls: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  button: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.12)' },
  selectedButton: { backgroundColor: colors.pink2 },
  pressedButton: { opacity: 0.7 },
  buttonText: { fontFamily: fonts.bold, fontSize: 11, color: colors.white },
  selectedText: { color: colors.plum },
});
