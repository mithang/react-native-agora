import './extension/IAgoraSpatialAudioExtension';
import { RtcConnection } from './IAgoraRtcEngineEx';
/**
 * The spatial position of the remote user or the media player.
 */
export class RemoteVoicePositionInfo {
  /**
   * The coordinates in the world coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  position?: number[];
  /**
   * The unit vector of the x axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  forward?: number[];
}

/**
 * Sound insulation area settings.
 */
export class SpatialAudioZone {
  /**
   * The ID of the sound insulation area.
   */
  zoneSetId?: number;
  /**
   * The spatial center point of the sound insulation area. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  position?: number[];
  /**
   * Starting at position, the forward unit vector. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  forward?: number[];
  /**
   * Starting at position, the right unit vector. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  right?: number[];
  /**
   * Starting at position, the up unit vector. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  up?: number[];
  /**
   * The entire sound insulation area is regarded as a cube; this represents the length of the forward side in the unit length of the game engine.
   */
  forwardLength?: number;
  /**
   * The entire sound insulation area is regarded as a cube; this represents the length of the right side in the unit length of the game engine.
   */
  rightLength?: number;
  /**
   * The entire sound insulation area is regarded as a cube; this represents the length of the up side in the unit length of the game engine.
   */
  upLength?: number;
  /**
   * The sound attenuation coefficient when users within the sound insulation area communicate with external users. The value range is [0,1]. The values are as follows:0: Broadcast mode, where the volume and timbre are not attenuated with distance, and the volume and timbre heard by local users do not change regardless of distance.(0,0.5): Weak attenuation mode, that is, the volume and timbre are only weakly attenuated during the propagation process, and the sound can travel farther than the real environment.0.5: (Default) simulates the attenuation of the volume in the real environment; the effect is equivalent to not setting the audioAttenuation parameter.(0.5,1]: Strong attenuation mode (default value is 1), that is, the volume and timbre attenuate rapidly during propagation.
   */
  audioAttenuation?: number;
}

/**
 * This class contains some of the APIs in the ILocalSpatialAudioEngine class.
 * The ILocalSpatialAudioEngine class inherits from IBaseSpatialAudioEngine.
 */
export abstract class IBaseSpatialAudioEngine {
  /**
   * Destroys IBaseSpatialAudioEngine .
   * This method releases all resources under IBaseSpatialAudioEngine. When the user does not need to use the spatial audio effect, you can call this method to release resources for other operations.After calling this method, you can no longer use any of the APIs under IBaseSpatialAudioEngine.Call this method before the release method under IRtcEngine .
   */
  abstract release(): void;

  /**
   * Sets the maximum number of streams that a user can receive in a specified audio reception range.
   * If the number of receivable streams exceeds the set value, the local user receives the maxCount streams that are closest to the local user. If there are users who belong to the same team as the local user in the room, the local user receives the audio of the teammates first. For example, when maxCount is set to 3, if there are five remote users in the room, two of whom belong to the same team as the local user, and three of whom belong to different teams but are within the audio reception range of the local user, the local user can hear the two teammates and the one user from a different team closest to the local user.
   *
   * @param maxCount The maximum number of streams that a user can receive within a specified audio reception range.
   */
  abstract setMaxAudioRecvCount(maxCount: number): number;

  /**
   * Sets the audio reception range of the local user.
   * After the setting is successful, the local user can only hear the remote users within the setting range or belonging to the same team. You can call this method at any time to update the audio reception range.
   *
   * @param range The maximum audio reception range. The unit is meters. The value must be greater than 0.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setAudioRecvRange(range: number): number;

  /**
   * Sets the length (in meters) of the game engine distance per unit.
   * In a game engine, the unit of distance is customized, while in the Agora spatial audio algorithm, distance is measured in meters. By default, the SDK converts the game engine distance per unit to one meter. You can call this method to convert the game engine distance per unit to a specified number of meters.
   *
   * @param unit The number of meters that the game engine distance per unit is equal to. This parameter must be greater than 0.00. For example, setting unit as 2.00 means the game engine distance per unit equals 2 meters.The larger the value is, the faster the sound heard by the local user attenuates when the remote user moves far away from the local user.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setDistanceUnit(unit: number): number;

  /**
   * Updates the spatial position of the local user.
   * Under the ILocalSpatialAudioEngine class, this method needs to be used with updateRemotePosition . The SDK calculates the relative position between the local and remote users according to this method and the parameter settings in updateRemotePosition, and then calculates the user's spatial audio effect parameters.
   *
   * @param position The coordinates in the world coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   * @param axisForward The unit vector of the x axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   * @param axisRight The unit vector of the y axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   * @param axisUp The unit vector of the z axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  abstract updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number;

  /**
   * @ignore
   */
  abstract updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): number;

  /**
   * Updates the spatial position of the media player.
   * After a successful update, the local user can hear the change in the spatial position of the media player.
   *
   * @param playerId The ID of the media player.
   * @param positionInfo The spatial position of the media player. See RemoteVoicePositionInfo .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number;

  /**
   * Enables or disables the spatial audio effect for the media player.
   * After successfully setting the spatial audio effect parameters of the media player, the SDK enables the spatial audio effect for the media player, and the local user can hear the media resources with a sense of space.If you need to disable the spatial audio effect for the media player, set the params parameter to null.
   *
   * @param params The spatial audio effect parameters of the media player. See SpatialAudioParams for details.
   */
  abstract setParameters(params: string): number;

  /**
   * Stops or resumes publishing the local audio stream.
   * This method does not affect any ongoing audio recording, because it does not disable the audio capture device.Call this method after joinChannel [2/2] .When using the spatial audio effect, if you need to set whether to publish the local audio stream, Agora recommends calling this method instead of the muteLocalAudioStream method under IRtcEngine .
   *
   * @param mute Whether to stop publishing the local audio stream.true: Stop publishing the local audio stream.false: Publish the local audio stream.
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /**
   * Stops or resumes subscribing to the audio streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.Call this method after joinChannel [2/2] .When using the spatial audio effect, if you need to set whether to stop subscribing to the audio streams of all remote users, Agora recommends calling this method instead of the muteAllRemoteAudioStreams method under IRtcEngine .After calling this method, you need to call updateSelfPosition and updateRemotePosition to update the spatial location of the local user and the remote user; otherwise, the settings in this method do not take effect.
   *
   * @param mute Whether to stop subscribing to the audio streams of all remote users:true: Stops subscribing to the audio streams of all remote users.false: Subscribe to the audio streams of all remote users.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  /**
   * Sets the sound insulation area.
   * In virtual interactive scenarios, you can use this method to set the sound insulation area and sound attenuation coefficient. When the sound source (which can be the user or the media player) and the listener belong to the inside and outside of the sound insulation area, they can experience the attenuation effect of sound similar to the real environment when it encounters a building partition.When the sound source and the listener belong to the inside and outside of the sound insulation area, the sound attenuation effect is determined by the sound attenuation coefficient in SpatialAudioZone .If the user or media player is in the same sound insulation area, it is not affected by SpatialAudioZone, and the sound attenuation effect is determined by the attenuation parameter in setPlayerAttenuation or setRemoteAudioAttenuation. If you do not call setPlayerAttenuation or setRemoteAudioAttenuation, the default sound attenuation coefficient of the SDK is 0.5, which simulates the attenuation of the sound in the real environment.If the sound source and the receiver belong to two sound insulation areas, the receiver cannot hear the sound source.If this method is called multiple times, the last sound insulation area set takes effect.
   *
   * @param zones Sound insulation area settings. See SpatialAudioZone.
   * @param zoneCount The number of sound insulation areas.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setZones(zones: SpatialAudioZone, zoneCount: number): number;

  /**
   * Sets the sound attenuation properties of the media player.
   *
   * @param playerId The ID of the media player.
   * @param attenuation The sound attenuation coefficient of the remote user or media player. The value range is [0,1]. The values are as follows:0: Broadcast mode, where the volume and timbre are not attenuated with distance, and the volume and timbre heard by local users do not change regardless of distance.(0,0.5): Weak attenuation mode, that is, the volume and timbre are only weakly attenuated during the propagation process, and the sound can travel farther than the real environment.0.5: (Default) simulates the attenuation of the volume in the real environment; the effect is equivalent to not setting the speaker_attenuation parameter.(0.5,1]: Strong attenuation mode, that is, the volume and timbre attenuate rapidly during the propagation process.
   * @param forceSet Whether to force the sound attenuation effect of the media player:true: Force attenuation to set the attenuation of the user. At this time, the attenuation coefficient of the sound insulation area set in the audioAttenuation in the SpatialAudioZone does not take effect for the user.false: Do not force attenuation e to set the user's sound attenuationffect, as shown in the following two cases.If the sound source and listener are inside and outside the sound isolation area, the sound attenuation effect is determined by the audioAttenuation in SpatialAudioZone.If the sound source and the listener are in the same sound insulation area or outside the same sound insulation area, the sound attenuation effect is determined by attenuation in this method.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setPlayerAttenuation(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): number;

  /**
   * Stops or resumes subscribing to the audio stream of a specified user.
   * Call this method after joinChannel [2/2] .When using the spatial audio effect, if you need to set whether to stop subscribing to the audio stream of a specified user, Agora recommends calling this method instead of the muteRemoteAudioStream method under IRtcEngine .
   *
   * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
   * @param mute Whether to subscribe to the specified remote user's audio stream.true: Stop subscribing to the audio stream of the specified user.false: (Default) Subscribe to the audio stream of the specified user. The SDK decides whether to subscribe according to the distance between the local user and the remote user.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;
}

/**
 * This class calculates user positions through the SDK to implement the spatial audio effect.
 * This class inherits from IBaseSpatialAudioEngine . Before calling other APIs in this class, you need to call the initialize method to initialize this class.
 */
export abstract class ILocalSpatialAudioEngine extends IBaseSpatialAudioEngine {
  /**
   * Initializes ILocalSpatialAudioEngine .
   * Before calling other methods of the ILocalSpatialAudioEngine class, you need to call this method to initialize ILocalSpatialAudioEngine.The SDK supports creating only one ILocalSpatialAudioEngine instance for an app.
   */
  abstract initialize(): number;

  /**
   * Updates the spatial position of the specified remote user.
   * After successfully calling this method, the SDK calculates the spatial audio parameters based on the relative position of the local and remote user.Call this method after joinChannel [2/2] .
   *
   * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
   * @param posInfo The spatial position of the remote user. See RemoteVoicePositionInfo .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract updateRemotePosition(
    uid: number,
    posInfo: RemoteVoicePositionInfo
  ): number;

  /**
   * @ignore
   */
  abstract updateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): number;

  /**
   * Removes the spatial position of the specified remote user.
   * After successfully calling this method, the local user no longer hears the specified remote user.After leaving the channel, to avoid wasting resources, you can also call this method to delete the spatial position of the specified remote user.
   *
   * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
   */
  abstract removeRemotePosition(uid: number): number;

  /**
   * Occurs when the most active remote speaker is detected.
   * After a successful call of enableAudioVolumeIndication , the SDK continuously detects which remote user has the loudest volume. During the current period, the remote user, who is detected as the loudest for the most times, is the most active user.When the number of users is no less than two and an active remote speaker exists, the SDK triggers this callback and reports the uid of the most active remote speaker.If the most active remote speaker is always the same user, the SDK triggers the onActiveSpeaker callback only once.If the most active remote speaker changes to another user, the SDK triggers this callback again and reports the uid of the new active remote speaker.
   *
   * @param uid The user ID of the most active remote speaker.
   * @param connection The connection information. See RtcConnection .
   */
  abstract removeRemotePositionEx(
    uid: number,
    connection: RtcConnection
  ): number;

  /**
   * Removes the spatial positions of all remote users.
   * After successfully calling this method, the local user no longer hears any remote users.After leaving the channel, to avoid wasting resources, you can also call this method to delete the spatial positions of all remote users.
   */
  abstract clearRemotePositions(): number;

  /**
   * Resumes the media stream relay to all destination channels.
   * After calling the pauseAllChannelMediaRelayEx method, you can call this method to resume relaying media streams to all destination channels.After a successful method call, the SDK triggers the onChannelMediaRelayEvent callback to report whether the media stream relay is successfully resumed.Call this method after pauseAllChannelMediaRelayEx .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract clearRemotePositionsEx(connection: RtcConnection): number;

  /**
   * Sets the sound attenuation effect for the specified user.
   *
   * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
   * @param attenuation For the user's sound attenuation coefficient, the value range is [0,1]. The values are as follows:0: Broadcast mode, where the volume and timbre are not attenuated with distance, and the volume and timbre heard by local users do not change regardless of distance.(0,0.5): Weak attenuation mode, that is, the volume and timbre are only weakly attenuated during the propagation process, and the sound can travel farther than the real environment.0.5: (Default) simulates the attenuation of the volume in the real environment; the effect is equivalent to not setting the speaker_attenuation parameter.(0.5,1]: Strong attenuation mode, that is, the volume and timbre attenuate rapidly during the propagation process.
   * @param forceSet Whether to force the user's sound attenuation effect:true: Force attenuation to set the sound attenuation of the user. At this time, the attenuation coefficient of the sound insulation area set in the audioAttenuation in the SpatialAudioZone does not take effect for the user.If the sound source and listener are inside and outside the sound isolation area, the sound attenuation effect is determined by the audioAttenuation in SpatialAudioZone.If the sound source and the listener are in the same sound insulation area or outside the same sound insulation area, the sound attenuation effect is determined by attenuation in this method.false: Do not force attenuation to set the user's sound attenuation effect, as shown in the following two cases.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): number;
}
