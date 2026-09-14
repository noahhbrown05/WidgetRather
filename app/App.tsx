/**
 * DEV HARNESS - NOT A SCREEN, NOT A DESIGN.
 *
 * D-021's exception to the D-014 hold is narrow: "back-end and native plumbing may
 * start now. All front-end screens still wait for the design freeze (ROADMAP Stage 2)."
 * All screens are Noah's (D-017). This file exists only so the plumbing can be driven
 * and read in a simulator - it is deliberately unstyled so nobody mistakes it for a
 * design, and it should be deleted or replaced when Noah's real screens arrive.
 *
 * What it is for: answering ROADMAP 4.3's two open questions.
 *   1. Does changing the widget need a native rebuild?  -> edit the widget, reload,
 *      see whether the change appears without a new EAS build.
 *   2. How late do votes actually arrive?  -> the "delay" numbers below, which need
 *      real phones (and so the $99 account) to mean anything.
 */

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

import { QUESTIONS } from './src/questions';
import { dropTimeForDay, hasDropped, localDayKey, questionForDay } from './src/schedule';
import { clearAnswers, readAnswers, type AnswerRecord } from './src/store';
import { answerInApp, onAppForeground, type CollectedVote } from './src/sync';

export default function App() {
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [collected, setCollected] = useState<CollectedVote[]>([]);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const dayKey = localDayKey(now);
  const question = questionForDay(dayKey);
  const dropAt = dropTimeForDay(now);
  const dropped = hasDropped(now);

  const refresh = () => setAnswers(readAnswers());

  useEffect(() => {
    onAppForeground()
      .then((votes) => {
        setCollected(votes);
        refresh();
      })
      .catch((e) => setError(String(e)));
  }, []);

  const mine = answers.find((a) => a.questionId === question.id);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16, paddingTop: 64 }}>
      <StatusBar style="auto" />

      <Text style={{ fontWeight: 'bold' }}>PASS 1 DEV HARNESS - not a design</Text>
      <Text style={{ color: '#666', marginBottom: 16 }}>
        Plumbing only (D-021). Screens wait for the design freeze.
      </Text>

      {error ? <Text style={{ color: '#b00' }}>Error: {error}</Text> : null}

      <Text style={{ fontWeight: 'bold', marginTop: 8 }}>Schedule (computed on-device)</Text>
      <Text>local day: {dayKey}</Text>
      <Text>drop time: {dropAt.toLocaleTimeString()}</Text>
      <Text>dropped yet: {String(dropped)}</Text>
      <Text>question id: {question.id}</Text>
      <Text>bank size: {QUESTIONS.length}</Text>

      <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Today</Text>
      <Text>A: {question.a}</Text>
      <Text>B: {question.b}</Text>
      <Text>your answer: {mine ? `${mine.choice} (via ${mine.source})` : 'none'}</Text>

      <View style={{ marginTop: 8 }}>
        <Button
          title="Answer A (in app)"
          onPress={() => {
            answerInApp(question.id, 'a');
            refresh();
          }}
        />
        <Button
          title="Answer B (in app)"
          onPress={() => {
            answerInApp(question.id, 'b');
            refresh();
          }}
        />
      </View>

      <Text style={{ fontWeight: 'bold', marginTop: 16 }}>
        Votes picked up from the widget this launch: {collected.length}
      </Text>
      {collected.map((v, i) => (
        <Text key={i}>
          {v.questionId} &rarr; {v.choice} | delay {Math.round(v.delayMs / 1000)}s
          {v.wasDuplicate ? ' | duplicate, ignored' : ''}
        </Text>
      ))}

      <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Answer history ({answers.length})</Text>
      {answers.map((a) => (
        <Text key={a.questionId}>
          {a.questionId} &rarr; {a.choice} | {a.source} | {new Date(a.answeredAt).toLocaleString()}
          {a.syncedAt === null ? ' | unsynced' : ''}
        </Text>
      ))}

      <View style={{ marginTop: 24, marginBottom: 48 }}>
        <Button
          title="Reset local answers"
          color="#b00"
          onPress={() => {
            clearAnswers();
            refresh();
          }}
        />
      </View>
    </ScrollView>
  );
}
